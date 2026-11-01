<template>
    <div class="dropdown">
        <div class="dropdown-toggle">
            <button @click="toggle_dropdown" ref="target">
                <IconMore class="icon"/>
            </button>
        </div>

        <div class="dropdown-content" v-show="dropdown_toggled">
            <div class="content" @click="clean_act_pomodoro">clear act pomodoro</div>
            <div class="content" @click="clear_finished_tasks">clear finished tasks</div>
            <div class="content" @click="clear_all_tasks">clear all tasks</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import IconMore from '@/assets/more.svg'
import { ref, useTemplateRef } from 'vue';
import {onClickOutside} from '@vueuse/core'

const emits = defineEmits<{
    (e: 'clean-act-pomodoro'): void,
    (e: 'clear-finished-tasks'): void,
    (e: 'clear-all-tasks'): void
}>()

// 如果点击了 button.toggle_dropdown 之外，那就 取消显示 dropdown-content

const dropdown_toggled = ref(false)
const toggle_dropdown = () => {
    dropdown_toggled.value = !dropdown_toggled.value;
}

const target = useTemplateRef('target')
onClickOutside(target, _ => dropdown_toggled.value = false)


const clean_act_pomodoro = () => {
    emits('clean-act-pomodoro')
}

const clear_all_tasks = () => {
    emits('clear-all-tasks')
}

const clear_finished_tasks = () => {
    emits('clear-finished-tasks')
}

</script>

<style lang="scss" scoped>
.dropdown {
    
    button {
        width: 36px;
        height: 36px;
        border: none;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        cursor: pointer;
        
        .icon {
            width: 100%;
            height: 100%;
            fill: white;
        }
    }

    .dropdown-content {
        position: absolute;
        right: 0;
        top: 40px;
        background-color: white;
        min-width: 180px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 3;
        border-radius: 4px;

        .content {
            font-size: 18px;
            height: 36px;
            padding-left: 10px;
            text-align: left;
            cursor: pointer;

            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }

        
    }
}
</style>