<template>
    <div class="floating-action-button" @click="toggle_click">
        <IconSetting class="icon"/>
    </div>
</template>

<script lang="ts" setup>
import IconSetting from '@/assets/setting.svg'

const emits = defineEmits<{
    click: []
}>()

const toggle_click = () => {
    emits("click")
}
</script>

<style lang="scss" scoped>
.floating-action-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: rgba(30, 144, 255, 0.9);
    cursor: pointer;
    

    &:hover {
        background-color: rgba(30, 144, 255, 1);
    }

    .icon {
        width: 100%;
        height: 100%;
        scale: 80%;
        fill: white;
    }
}
</style>