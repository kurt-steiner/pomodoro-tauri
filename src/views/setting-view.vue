<template>
    <Column class="settings" cross-axis-alignment="start">
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

        <Expanded/>
        
        <Row class="buttons" main-axis-alignment="space-between" main-axis-size="max">
            <button class="cancel" @click="go_back">Cancel</button>
            <button class="submit" @click="submit">Ok</button>
        </Row>
    </Column>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Settings from '@/model/settings';
import { usePomodoroStore } from '@/store';
import { useRouter } from 'vue-router';
import {Row, Column, Expanded} from '@/components/flex';

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
    height: 98vh;

    div.time {
        width: 100%;
    }

    .settings {
        background-color: white;
        width: 100%;
        padding-top: 8px;
        padding-left: 12px;
        padding-right: 8px;


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

        input.edit[type=range] {
            background-color: #ccc;
            height: 2px;
            appearance: none;
        }
        
        .buttons {
            height: 10%;
            padding: 13px 20px;
            border-top: 1.4px solid #eeeeee;

            button {
                width: 80px;
                box-sizing: border-box;
                cursor: pointer;
                font-size: 18px;
                padding: 4px 12px;
                // height: 28px;
                box-shadow: none;
                border: none;
                border-radius: 6px;

                color: white;

                &.cancel {
                    background: #909399;
                }

                &.submit {
                    background: #409EFF;
                }
            }
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
    

    .buttons {
        button {
            border: none;
            border-radius: 4px;
            font-size: 20px;
            cursor: pointer;
        }

        
        button.cancel {
            background-color: rgba(255, 255, 255, 0.1);
        }

        button.submit {
            background-color: black;
            color: white;

            width: 80px;
        }
    }
    
}
</style>