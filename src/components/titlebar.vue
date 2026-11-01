<template>
    <div class="titlebar" data-tauri-drag-region>
    <span class="title">Pomodoro</span>
    <div class="controls">
        <button @click="minimize">—</button>
        <button @click="toggleMaximize">□</button>
        <button @click="close">✕</button>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentWindow } from '@tauri-apps/api/window'
const appWindow = getCurrentWindow()

const minimize = () => appWindow.minimize()
const toggleMaximize = () => appWindow.toggleMaximize()
const close = () => appWindow.close()
</script>

<style lang="scss" scoped>
.titlebar {
    /* height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    background: #2b2b2b;
    color: #fff;
    user-select: none;
 */

    display: none;
}
</style>