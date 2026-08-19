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
    let width = ""

    if (props.mainAxisSize == "max") {
        width = "100%"
    }
    
    return {
        display: "flex",
        flexDirection: "row",
        justifyContent: props.mainAxisAlignment,
        alignItems: props.crossAxisAlignment,
        width,

        boxSizing: "border-box"
    }
})

</script>