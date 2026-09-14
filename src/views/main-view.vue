<template>
    <main :style="{'background': state.background_color}">
        <Column class="container">
            <Row main-axis-size="max" main-axis-alignment="end">
                <button class="settings" @click="toggle_settings">
                    <Row main-axis-size="min" cross-axis-alignment="center">
                        <img :src="image_config"/>
                        <span class="text">Settings</span>
                    </Row>
                </button>
            </Row>
            <Pomodoro/>
            <Sizedbox height="10vh"/>
        </Column>
    </main>
    <!-- <FloatingActionButton @click="handle_fab_click"/> -->
</template>

<script lang="ts" setup>
import Pomodoro from "@/components/pomodoro/pomodoro.vue";
import { Column, Row } from "@/components/flex/index.ts";
import { usePomodoroStore } from "@/store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import image_config from "@/assets/config.png"
import Sizedbox from "@/components/sizedbox.vue";

const router = useRouter()
const state = usePomodoroStore();

const toggle_settings = () => {
    router.push({name: 'settings'})
}

onMounted(async () => {
  await state.load_database()
})

</script>

<style lang="scss" scoped>
main {
    height: 110vh;
    overflow: scroll;

    .container {
        width: 100%;
        
        padding-top: 8px;
        padding-left: 12px;

        button.settings {
            width: fit-content;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0.9;
            background: none;
            font-size: 13px;
            padding: 8px 12px;
            background-color: rgba(255, 255, 255, 0.2);
            border: none;
            color: white !important;
            box-shadow: none;;
            margin-right: 8px;

            img {
                text-align: center;
                cursor: pointer;
                width: 16px;
            }

            span.text {
                display: block;
                margin-left: 6px;
            }
        }
    }
}
</style>
