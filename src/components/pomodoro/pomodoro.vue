<template>
    <Column class="pomodoro" cross-axis-alignment="center">
        <Panel/>

        <h3 class="title">{{ title }}</h3>
        <Row class="dropdown-wrapper" main-axis-size="max" main-axis-alignment="end">
            <!-- dropdown -->
            <Dropdown @clean-act-pomodoro="clean_act_pomodoro"
                      @clear-all-tasks="clear_all_tasks"
                      @clear-finished-tasks="clear_finished_tasks"/>
        </Row>

        <hr/>
        <Sizedbox height="10px"/>
        <div class="tasks">
            <VueDraggable handle=".handle" v-model="store.tasks" @update="handle_reorder">
                <template v-for="task in store.tasks" :key="task.id">
                    <div class="task-item">
                        <TaskCard :task="task"
                                :selected="task.id == store.selected_task_id"
                                :expanded="task.id == store.expanded_task_id"
                                @select="handle_select(task)"
                                @expand="handle_expand(task)"
                                @delete="handle_delete(task)"
                                @save="handle_save($event)"
                                @cancel="handle_cancel"/>
                        <Sizedbox height="10px"/>
                    </div>
                </template>
            </VueDraggable>


            <CardAdd @append="handle_append"/>
        </div>
    </Column>
</template>

<script lang="ts" setup>
import Panel from '@/components/counter/panel.vue';
import TaskCard from '@/components/taskcard/taskcard.vue';
import {Column, Row} from '@/components/flex';
import CardAdd from '@/components/taskcard/card-add.vue';

import { usePomodoroStore } from '@/store';
import { computed } from 'vue';
import { ITask } from '@/model/task';
import Sizedbox from '@/components/sizedbox.vue';
import { VueDraggable } from 'vue-draggable-plus';
import Dropdown from '@/components/dropdown';

const store = usePomodoroStore()

const title = computed(() => {
    if (store.selected_task_id == null) {
        return ""
    }

    let filtered = store.tasks.filter(task => task.id == store.selected_task_id)
    if (filtered.length == 0) {
        return ""
    }

    return filtered[0].title;
})

const handle_select = (task: ITask) => {
    store.selected_task_id = task.id
}

const handle_expand = (task: ITask) => {
    store.expanded_task_id = task.id
}

const handle_delete = async (task: ITask) => {
    if (task.id == store.selected_task_id) {
        store.selected_task_id = null
    }

    // state.remove_task(index)
    await store.delete_task(task)
    store.expanded_task_id = null
}

const handle_save = async (value: ITask) => {
    // state.replace_task(index, value)
    await store.update_task(value)
    store.expanded_task_id = null
}

const handle_cancel = () => {
    store.expanded_task_id = null
}

const handle_append = async (task: ITask) => {
    // state.add_task(task)
    await store.insert_task(task)
}

const handle_reorder = async () => {
    await store.update_reorder()
}

// define methods in store
const clear_all_tasks = async () => {
    await store.clear_all_tasks()
}

const clean_act_pomodoro = async () => {
    await store.clean_act_pomodoro()
}

const clear_finished_tasks = async () => {
    await store.clear_finished_tasks()
}

</script>


<style lang="scss" scoped>
.pomodoro {
    width: 480px;

    h3.title {
        color: white;
        height: 28px;
    }

    hr {
        width: 100%;
        color: white;
    }

    div.tasks {
        width: 100%;
        //box-sizing: border-box;
    }

    .dropdown-wrapper {
        position: relative;
    }
}
</style>
