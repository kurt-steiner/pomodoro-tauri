<template>
    <div class="settings">
        <div class="time">
            <h3>Time(minutes)</h3>

            <Row main-axis-size="max" main-axis-alignment="space-between" cross-axis-alignment="center">
                <div class="edit">
                    <label>Pomodoro</label>
                    <input type="number" 
                        class="edit"
                        v-model="settings_copied.pomodoro_time" 
                        min="15"
                        max="99"/>
                </div>

                <div class="edit">
                    <label>Short Break</label>
                    <input type="number"
                        class="edit"
                        v-model="settings_copied.shortbreak_time"
                        min="1"
                        max="10"/>
                </div>

                <div class="edit">
                    <label>Long Break</label>
                    <input type="number"
                        class="edit"
                        v-model="settings_copied.longbreak_time"
                        min="1"
                        max="30"/>
                </div>
            </Row>
        </div>
        
        <Row main-axis-size="max" main-axis-alignment="space-between" cross-axis-alignment="center">
            <h3>Long Break Interval</h3>

            <input class="edit"
                type="number" 
                v-model="settings_copied.longbreak_interval"
                min="1"
                max="10"/>
        </Row>


        <div class="sound">

        </div>
        
        <Row class="buttons" main-axis-alignment="space-between" main-axis-size="max">
            <button @click="submit">Ok</button>
            <button @click="go_back">click me to back</button>
        </Row>
        
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Settings from '@/model/settings';
import { usePomodoroStore } from '@/store';
import { useRouter } from 'vue-router';
import Row from '@/components/flex/row.vue';

const router = useRouter()
const state = usePomodoroStore()

const settings_copied = reactive<Settings>({...state.settings});


const submit = () => {
    state.settings = {
        ...settings_copied
    }

    state.reset_counter();
    router.back()
}

const go_back = () => {
    router.back()
}

</script>

<style lang="scss" setup>
.settings {
    background-color: white;

    div.edit {
        width: 25%;
        label {
            display: block;
            font-size: 14px;
            color: #aaa;
            font-weight: bold;
            margin-bottom: 4px;
        }

        input.edit {
            width: 100%;
         
        }
    }


    input.edit {
        border-radius: 6px;
        background-color: #efefef;
        font-size: 16px;
        padding: 10px 10px;
        box-shadow: none;
        border: none;
        color: #555;
        box-sizing: border-box;
    }
    
    

}
</style>