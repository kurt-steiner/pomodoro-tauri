import { defineStore } from "pinia";
import Counter from "@/model/counter";
import { computed, ref } from "vue";
import { FocusStatus, RunningStatus } from "@/model/status";
import type { ITask } from "@/model/task";
import sound from '@/assets/notifaction.mp3'
import Database from '@tauri-apps/plugin-sql'
import * as service from '@/service'
import Settings from "./model/settings";

export const usePomodoroStore = defineStore('pomodoro', () => {
    const settings = ref<Settings>({
        pomodoro_time: 25,
        shortbreak_time: 5,
        longbreak_time: 15,
        longbreak_interval: 4,

        playing_repeat_count: 1,
        playing_sound_volumes: 0.7

    })


    const counter = ref(new Counter(settings.value))

    const tasks = ref<ITask[]>([])
    
    // 当前选中 任务 id
    const selected_task_id = ref<number | null>(null)
    // 当前展开 任务 id
    const expanded_task_id = ref<number | null>(null)

    const focus_status = computed({
        get: () => counter.value.focus_status,
        set: (status: FocusStatus) => {
            counter.value.set_focus_status(status)
            pause_countdown()
        }
    })

    const time_text = computed(() => counter.value.time_text)
    const running_status = computed(() => counter.value.running_status)

    let interval: number = -1

    const start_countdown = () => {
        if (audio.played) {
            pause_audio()
        }

        if (interval == -1) {
            interval = window.setInterval(async () => {
                if (counter.value.countdown_once()) { // 计时结束
                    pause_countdown()

                    // plus task.actual_pomodoro_count
                    if (focus_status.value != FocusStatus.Pomodoro) { // 从 Pomodoro 计时结束
                        let matched_tasks = tasks.value.filter(task => task.id == selected_task_id.value)
                        if (matched_tasks.length == 0) {
                            return;
                        }

                        matched_tasks[0].actual_pomodoro_count += 1
                        await update_task(matched_tasks[0]);
                    }
                    
                    play_audio()
                }
            }, 10)
        }
    }

    const pause_countdown = () => {
        window.clearInterval(interval)
        interval = -1
    }

    const toggle_running = () => {
        if (counter.value.running_status == RunningStatus.Paused) {
            counter.value.running_status = RunningStatus.Running
            start_countdown()
        } else {
            counter.value.running_status = RunningStatus.Paused
            pause_countdown()
        }
    }

    const background_color = computed(() => {
        switch (focus_status.value) {
            case FocusStatus.Pomodoro: {
                return "rgb(175, 73, 73)"
            }

            case FocusStatus.ShortBreak: {
                return "rgb(41, 116, 121)"
            }

            case FocusStatus.LongBreak: {
                return "rgb(47, 106, 149)"
            }
        }
    })


    const audio = new Audio(sound)

    const play_audio = async () => {
        audio.volume = settings.value.playing_sound_volumes
        for (let count = 1; count <= settings.value.playing_repeat_count; count += 1) {
            await audio.play()
            audio.currentTime = 0
        }
    }

    const pause_audio = () => {
        audio.currentTime = 0
        audio.pause()
    }


    let _database: Database | null = null
    const database = computed(() => {
        if (_database == null) {
            throw new Error("database not initilized")
        }

        return _database
    })

    const load_database = async (): Promise<void> => {
        if (_database != null) {
            return;
        }

        if (_database == null) {
            _database = await Database.load("sqlite:tasks.db")
        }

        const data = await select_tasks()
        
        // tasks.value.push(data)
        tasks.value.push(...data)
        // triggerRef(tasks)
    }

    const insert_task = async (task: ITask): Promise<ITask> => {
        task.next_id = null
        const result = await service.insert_one(database.value, task)

        if (tasks.value.length != 0) {
            let last_index = tasks.value.length - 1
            let last_task = tasks.value[last_index]
            last_task.next_id = result.id
            await update_task(last_task)
        }

        tasks.value.push(result)
        // triggerRef(tasks)
        return result
    }

    const delete_task = async (task: ITask): Promise<void> => {
        await service.delete_one(database.value, task)

        let index = tasks.value.findIndex(value => value.id == task.id)

        // 更新 上一个task 的 next_id
        if (index == tasks.value.length - 1) {
            if (tasks.value.length > 1) {
                tasks.value[index - 1].next_id = null
            } else {
                // 此时，只有一个元素，不需要再设置
            }
        } else if (index != 0) {
            tasks.value[index - 1].next_id = tasks.value[index + 1].id
        }

        tasks.value.splice(index, 1)
        // triggerRef(tasks)
    }

    // reorder
    const update_reorder = async () => {
        let task_array = tasks.value
        for (let index = 0; index < task_array.length - 1; index += 1) {
            task_array[index].next_id = task_array[index + 1].id
        }

        let last_index = task_array.length - 1
        if (last_index >= 0) {
            task_array[last_index].next_id = null
        }

        let result = await Promise.all(task_array.map(task => update_task(task)))

        for (let index = 0; index < task_array.length; index += 1) {
            tasks.value[index] = result[index]
        }

        // triggerRef(tasks)
    }

    const update_task = async (task: ITask): Promise<ITask> => {
        const result = await service.update_one(database.value, task)
        let index = tasks.value.findIndex(value => value.id == task.id)

        // replace task
        tasks.value[index] = result

        // triggerRef(tasks)
        return result
    }

    const select_tasks = async (): Promise<ITask[]> => {
        const origin_data = await service.select_all(database.value)

        if (origin_data.length == 0 || origin_data.length == 1) {
            return origin_data
        }

        let result: ITask[] = [];

        // 先找尾节点
        let tail_task = origin_data.find(task => task.next_id == null)
        if (tail_task === undefined) {
            throw new Error("undefined tail")
        }

        result.push(tail_task)

        while (true) {
            let next_task = origin_data.find(task => task.next_id == tail_task!.id)
            if (next_task === undefined) {
                break;
            }

            result.push(next_task)
            tail_task = next_task
        }
        
        return result.reverse();
    }

    const delete_all_tasks = async (): Promise<void> => {
        await service.delete_all(database.value)
    }


    // 重置计时器
    const reset_counter = () => {
        counter.value.reset(settings.value)
    }


    const clean_act_pomodoro = async (): Promise<void> => {
        tasks.value.forEach(task => task.actual_pomodoro_count = 0)
        await Promise.all(tasks.value.map(task => update_task(task)));
    }

    const clear_all_tasks = async (): Promise<void> => {
        tasks.value = []
        await delete_all_tasks()
    }

    const clear_finished_tasks = async (): Promise<void> => {
        await Promise.all(
            tasks.value
                .filter(task => task.is_done)
                .map(task => delete_task(task)))

        tasks.value = await select_tasks();
    }

    return {
        focus_status,
        time_text,
        running_status,
        toggle_running,
        background_color,
        tasks,

        expanded_task_id,
        selected_task_id,

        play_audio,
        pause_audio,
        settings,


        load_database,
        

        insert_task,
        delete_task,
        update_task,
        update_reorder,
        select_tasks,
        delete_all_tasks,

        reset_counter,

        clear_all_tasks,
        clear_finished_tasks,
        clean_act_pomodoro
    }
})
