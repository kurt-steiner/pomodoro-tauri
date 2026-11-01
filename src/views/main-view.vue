<template>
    <div class="container"
         :style="{ 'background-color': state.background_color }">
        <Column>
            <Row main-axis-alignment="end" cross-axis-alignment="center" main-axis-size="max">
                <button class="settings" @click="goto_settings">
                    <Row cross-axis-alignment="center">
                        <IconSetting class="icon"/>
                        <Sizedbox width="5px"/>
                        <span>Settings</span>
                    </Row>
                    
                </button>
            </Row>

            <Pomodoro/>
            <Sizedbox height="300px"/>
        </Column>
    </div>

    <!-- <FloatingActionButton @click="handle_fab_click"/> -->
</template>

<script lang="ts" setup>
import IconSetting from '@/assets/setting.svg'
import Pomodoro from "@/components/pomodoro/pomodoro.vue";
import { Column, Row } from "@/components/flex/index.ts";
import { usePomodoroStore } from "@/store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Sizedbox from "@/components/sizedbox.vue";

const router = useRouter()
const state = usePomodoroStore();

const goto_settings = () => {
    router.push({name: 'settings'})
}

onMounted(async () => {
  await state.load_database()
})

</script>

<style lang="scss" scoped>
.container {
    // 将周围空白填充
    position: absolute;
    inset: 0;
    overflow: scroll;

    padding: 10px;
    button.settings {
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        cursor: pointer;

        height: 35px;
        min-width: 80px;
        border-radius: 4px;

        .icon {
            width: 20px;
            height: 20px;
            fill: white;
        }

        span {
            color: white !important;
            font-weight: bold;
            font-size: 14px;
            text-align: center;
        }
    }

    // scrollbar
    scrollbar-width: none;    
}
</style>
