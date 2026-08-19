<template>
    <div class="row" :style="style">
        <slot/>
    </div>
</template>

<script lang="ts" setup>
import { computed, StyleValue } from 'vue';
import { CrossAxisAlignment, MainAxisAlignment, MainAxisSize } from '.';

const props = withDefaults(
    defineProps<{
        mainAxisSize ?: MainAxisSize,
        mainAxisAlignment ?: MainAxisAlignment,
        crossAxisAlignment ?: CrossAxisAlignment
    }>(),

    {
        mainAxisSize: "min",
        mainAxisAlignement: "start",
        crossAxisAlignment: "start"
    })

const style = computed((): StyleValue => {
    let height = ""

    if (props.mainAxisSize == "max") {
        height = "100%"
    }
    
    return {
        display: "flex",
        flexDirection: "column",
        justifyContent: props.mainAxisAlignment,
        alignItems: props.crossAxisAlignment,
        height,
        boxSizing: "border-box"
    }
})

</script>