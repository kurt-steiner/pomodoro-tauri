<template>
    <template v-if="!toggled">
        <Row main-axis-size="max" main-axis-alignment="center" cross-axis-alignment="center" class="card-add" @click="handle_toggle">
            <div class="icon" v-html="icon_add"/>
            <Sizedbox width="10px"/>
            Add Task
        </Row>
    </template>

    <template v-else>
        <CardExpand 
                :task="task_placeholder" 
                append 
                @cancel="handle_cancel"
                @save="handle_append"/>
    </template>
</template>

<script lang="ts" setup>
import { Row } from '@/components/flex';
import icon_add from '@/assets/add.svg?raw'
import { onMounted, ref } from 'vue';
import { ITask } from '@/model/task';
import CardExpand from './card-expand.vue';
import Sizedbox from '@/components/sizedbox.vue'

const emits = defineEmits<{
    append: [ITask]
}>()

const toggled = ref(false)
const task_placeholder = ref<ITask>({
    id: -1,
    title: "",
    is_done: false,
    expect_pomodoro_count: 1,
    actual_pomodoro_count: 0,
    note: null,
    next_id: null
})

const handle_toggle = () => {
    toggled.value = true
}

const handle_cancel = () => {
    toggled.value = false
    task_placeholder.value = {
        id: -1,
        title: "",
        is_done: false,
        expect_pomodoro_count: 1,
        actual_pomodoro_count: 0,
        note: null,
        next_id: null
    }
}

const handle_append = (task: ITask) => {
    emits("append", task)
    handle_cancel()
}

onMounted(() => console.log(icon_add))
</script>

<style lang="scss" scoped>
.card-add {
    color: white;
    font-weight: bold;
    height: 64px;
    border-radius: 8px;
    opacity: 0.8;
    border: dashed 2px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    .icon {
        display: block;
        width: 24px;
        height: 24px;
        fill: white;
    }
}

</style>