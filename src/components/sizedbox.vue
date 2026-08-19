<template>
    <div class="sizedbox" :style="style">
        <slot/>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    width ?: string,
    height ?: string
}>()

const style = computed(() => {
    return {
        width: props.width,
        height: props.height
    }
})
</script>