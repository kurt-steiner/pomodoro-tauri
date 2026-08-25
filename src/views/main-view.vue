<template>
    <div
        class="container"
        :style="{ 'background-color': state.background_color }">
        <Column>
            <Pomodoro/>
            <Sizedbox height="1000px"/>
        </Column>
    </div>

    <FloatingActionButton @click="handle_fab_click"/>
</template>

<script lang="ts" setup>
import Pomodoro from "@/components/pomodoro/pomodoro.vue";
import Sizedbox from "@/components/sizedbox.vue";
import { Column } from "@/components/flex/index.ts";
import { usePomodoroStore } from "@/store";
import { onMounted } from "vue";
import FloatingActionButton from "@/components/floating-action-button.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const state = usePomodoroStore();

const handle_fab_click = () => {
    router.push({name: 'settings'})
}

onMounted(async () => {
  await state.load_database()
})

</script>

<style lang="scss" scoped>
main.container {
    display: flex;
    justify-content: center;
}
</style>
