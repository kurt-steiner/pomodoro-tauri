<template>
    <div class="expanded" :style="style">
        <slot/>
    </div>
</template>

<script lang="ts" setup>
import {computed, StyleValue} from "vue"

const props = withDefaults(
    defineProps<{
        flex ?: number
    }>(),

    {
        flex: 1
    }
)

const style = computed((): StyleValue => {
    return {
        flexGrow: props.flex,
        flexShrink: 1,
        flexBasis: "auto"
    }
})
</script>