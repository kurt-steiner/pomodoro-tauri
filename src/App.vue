<template>
    <TitleBar/>
    
    <router-view/>
</template>

<script lang="ts" setup>
import TitleBar from '@/components/titlebar.vue'
</script>

<style lang="scss">

html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    /* Firefox */
    scrollbar-width: none;
    /* IE & Legacy Edge */
    -ms-overflow-style: none;
    /* 保持滚动功能 */
    overflow: auto;
    
}

main {
    font-family:
            "ArialRounded",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif,
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol";
}

</style>