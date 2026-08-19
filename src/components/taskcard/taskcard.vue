<template>
    <template v-if="!expanded">
        <CardPreview
                   class="handle"
                   :task="task"
                   @select="handle_select" 
                   @expand="handle_expand" 
                   :selected="selected"
                   @done="handle_done"/>
    </template>

    <template v-else>
        <CardExpand :task="task" @delete="handle_delete" @save="handle_save" @cancel="handle_cancel"/>
    </template>
</template>

<script lang="ts" setup>
import CardPreview from './card-preview.vue';
import CardExpand from './card-expand.vue';
import type {ITask} from "@/model/task"

const emits = defineEmits<{
    select: [],
    expand: [],
    delete: [],
    save: [task: ITask],
    cancel: []
}>()


const props = withDefaults(
    defineProps<{
        expanded ?: boolean,
        task: ITask,
        selected ?: boolean
    }>(),

    {
        expanded: false,
        selected: false
    })

const handle_select = () => {
    emits("select")
}

const handle_expand = () => {
    emits("expand")
}

const handle_delete = () => {
    emits("delete")
}

const handle_done = (is_done: boolean) => {
    emits("save", {
        ...props.task,
        is_done
    })
}

const handle_save = (value: ITask) => {
    emits("save", value)
}

const handle_cancel = () => {
    emits("cancel")
}


</script>