<template>
    <Column class="counter-panel" cross-axis-alignment="center">
        <PanelHead v-model="state.focus_status"/>

        <div class="time">
            {{ state.time_text }}
        </div>

        <button :class="{'running': state.running_status == RunningStatus.Running}" @click="toggle_button" :style="{'color': state.background_color}">
            {{ button_text }}
        </button>
    </Column>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { usePomodoroStore } from '@/store';
import PanelHead from './head.vue';
import { RunningStatus } from '@/model/status';
import Column from '@/components/flex/column.vue';

const state = usePomodoroStore()
const button_text = computed(() => {
    if (state.running_status == RunningStatus.Paused) {
        return "START"
    } else {
        return "PAUSE"
    }
})

const toggle_button = () => {
    state.toggle_running()
}

</script>

<style lang="scss" scoped>
.counter-panel {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    
    padding-top: 20px;
    padding-bottom: 30px;
    margin-top: 20px;
    border-radius: 10px;
    
    div.time {
        font-size: 120px;
        color: white;
        font-weight: bold;
    }

    button {
        cursor: pointer;
        color: transparent;
        border: none;
        margin-top: 20px;
        padding: 0 12px;
        border-radius: 4px;
        
        font-size: 22px;
        font-weight: bold;

        height: 60px;
        width: 200px;
        background-color: white;

        box-shadow: none;

        transition: color 0.5s ease-in-out;

        /* TODO: set the style for button.running */
    }
}
</style>