<template>
    <Row class="head" main-axis-size="max" main-axis-alignment="center">
        <button :class="{toggled: status == FocusStatus.Pomodoro}" @click="toggle(FocusStatus.Pomodoro)">
            Pomodoro
        </button>

        <button :class="{toggled: status == FocusStatus.ShortBreak}" @click="toggle(FocusStatus.ShortBreak)">
            Short Break
        </button>

        <button :class="{toggled: status == FocusStatus.LongBreak}" @click="toggle(FocusStatus.LongBreak)">
            Long Break
        </button>
    </Row>
</template>

<script lang="ts" setup>
import { FocusStatus } from '@/model/status';
import Row from '@/components/flex/row.vue';

const status = defineModel<FocusStatus>()

const toggle = (value: FocusStatus) => {
    status.value = value
}
</script>

<style lang="scss" scoped>
div.head {
    width: 75px;
    
    button {
        cursor: pointer;
        
        color: white;
        font-size: 16px;
        padding: 4px 12px;
        // height: 28px;
        background: none;
        box-shadow: none;
        border: none;
        border-radius: 6px;
    }
    
    button.toggled {
        background-color: rgba(0, 0, 0, 0.15);
        font-weight: bold;
    }
}
</style>