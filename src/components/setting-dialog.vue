<template>
    <div class="setting-dialog">
        <div class="timer">
            <div class="title">
                Time (minutes)
            </div>

            <Row class="inputs">
                <input type="number" v-model="settings_copied.pomodoro_time" min="15" max="60"/>
                <input type="number" v-model="settings_copied.shortbreak_time" min="1" max="60"/>
                <input type="number" v-model="settings_copied.longbreak_time" min="1" max="60"/>
            </Row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { usePomodoroStore } from '@/store';
import { Row } from './flex';
import { ref } from 'vue';

const state = usePomodoroStore()
const settings_copied = ref({...state.settings})

</script>

<style lang="scss" scoped>
.setting-dialog {
    z-index: 100;
    background-color: white;
    width: 400px;
}
</style>