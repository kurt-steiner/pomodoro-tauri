<template>
    <Column class="pomodoro" cross-axis-alignment="center">
        <Panel/>

        <h3 class="title">{{ title }}</h3>
        <hr/>

        <!-- <TaskCardExpand :task="state.tasks[0]"/> -->
        <Sizedbox height="10px"/>
        <div class="tasks">
            <VueDraggable handle=".handle" v-model="state.tasks" @update="handle_reorder">
                <template v-for="task in state.tasks" :key="task.id">
                    <div class="task-item">
                        <TaskCard :task="task"
                                :selected="task.id == state.selected_task_id"
                                :expanded="task.id == state.expanded_task_id"
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
import Column from '@/components/flex/column.vue';
import CardAdd from '@/components/taskcard/card-add.vue';

import { usePomodoroStore } from '@/store';
import { computed, ref } from 'vue';
import { ITask } from '@/model/task';
import Sizedbox from '@/components/sizedbox.vue';
import { VueDraggable } from 'vue-draggable-plus';

const state = usePomodoroStore()

const title = computed(() => {
    if (state.selected_task_id == null) {
        return ""
    }

    let filtered = state.tasks.filter(task => task.id == state.selected_task_id)
    if (filtered.length == 0) {
        return ""
    }

    return filtered[0].title;
})

const handle_select = (task: ITask) => {
    state.selected_task_id = task.id
}

const handle_expand = (task: ITask) => {
    state.expanded_task_id = task.id
}

const handle_delete = async (task: ITask) => {
    if (task.id == state.selected_task_id) {
        state.selected_task_id = null
    }

    // state.remove_task(index)
    await state.delete_task(task)
    state.expanded_task_id = null
}

const handle_save = async (value: ITask) => {
    // state.replace_task(index, value)
    await state.update_task(value)
    state.expanded_task_id = null
}

const handle_cancel = () => {
    state.expanded_task_id = null
}

const handle_append = async (task: ITask) => {
    // state.add_task(task)
    await state.insert_task(task)
}

const handle_reorder = async () => {
    await state.update_reorder()
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
}
</style>
