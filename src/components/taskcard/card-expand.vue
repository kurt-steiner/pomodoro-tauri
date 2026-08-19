<template>
    <div class="taskcard-expand">
        <div class="edit">
            <div class="edit-title">
                <input type="text" autofocus v-model="task_copied.title" placeholder="What are you working on?"/>
            </div>

            <div class="edit-counts">
                <div class="text">
                    Act/Est Pomodoro
                </div>

                <Sizedbox height="10px"/>

                <Row class="buttons" main-axis-size="max" cross-axis-alignment="center">
                    <input type="number" min="0" step="1" v-model="task_copied.actual_pomodoro_count"/>

                    <Sizedbox width="6px"/>
                    /
                    <Sizedbox width="6px"/>

                    <input type="number" min="1" step="1" v-model="task_copied.expect_pomodoro_count"/>

                    <Sizedbox width="10px"/>

                    <button @click="toggle_count(true)">
                        <IconArrowUp/>
                    </button>

                    <Sizedbox width="6px"/>

                    <button @click="toggle_count(false)">
                        <IconArrowDown/>
                    </button>
                </Row>

            </div>

            <Sizedbox height="10px"/>

            <div class="edit-note">
                <template v-if="task_copied.note == null">
                    <button class="add-note" @click="toggle_add_note">
                        + Add Note
                    </button>
                </template>

                <template v-else>
                    <textarea v-model="task_copied.note"/>
                </template>
            </div>

        </div>

        <Sizedbox height="20px"/>
        <Row class="submit" main-axis-size="max" cross-axis-alignment="center">
            <template v-if="!append">
                <button class="delete" @click="toggle_delete">
                    <IconDelete/>
                </button>
            </template>

            <Expanded/>

            <button class="cancel" @click="toggle_cancel">
                Cancel
            </button>

            <button class="save" @click="toggle_save">
                Save
            </button>

        </Row>

    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import type { ITask } from '@/model/task';
import {IconArrowUp, IconArrowDown, IconDelete} from "@/components/icons";
import {Row, Expanded} from '@/components/flex';
import Sizedbox from '@/components/sizedbox.vue';

const props = withDefaults(
    defineProps<{
        task: ITask,
        append ?: boolean
    }>(),

    {
        append: false
    }
)

const emits = defineEmits<{
    delete: [],
    save: [task: ITask],
    cancel: []
}>()

const task_copied = ref({...props.task})

const toggle_count = (should_increment: boolean) => {
    if (should_increment) {
        task_copied.value.expect_pomodoro_count += 1;
    } else {
        if (task_copied.value.expect_pomodoro_count > 0) {
            task_copied.value.expect_pomodoro_count -= 1;
        }
    }
}

const toggle_delete = () => {
    emits("delete")
}

const toggle_save = () => {
    if (task_copied.value.note != null) {
        task_copied.value.note = task_copied.value.note.trim()
    }

    // 如果输入 "" 这种字符串，视作没有经过修改
    if (task_copied.value.note?.length == 0) {
        task_copied.value.note = null
    }

    emits("save", task_copied.value)
}

const toggle_cancel = () => {
    emits("cancel")
}

const toggle_add_note = () => {
    task_copied.value.note = ""
}

</script>

<style lang="scss" scoped>
div.taskcard-expand {
    background: white;
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;


    div.edit {
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 20px;

        div.edit-title {
            input {
                border-radius: 4px;
                font-size: 22px;
                padding: 10px 0px;
                box-shadow: none;
                border: none;
                font-weight: bold;
                width: 100%;
            }

            input::placeholder {
                color: #ddd;
            }

            input:focus {
                outline: none;
            }
        }

        div.edit-counts {
            div.text {
                font-weight: bold;
            }

            .buttons {
                color: #bbb;

                input {
                    border-radius: 6px;
                    background-color: #efefef;
                    font-size: 16px;
                    padding: 10px 10px;
                    box-shadow: none;
                    width: 75px;
                    font-weight: bold;
                    color: #bbb;
                    border: none;
                }

                input:focus {
                    outline: none;
                }

                button {
                    cursor: pointer;
                    width: 36px;
                    height: 36px;

                    border-radius: 8px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    background-color: white;

                    outline: none;

                    svg {
                        fill: rgba(0, 0, 0, 0.6);
                    }
                }
            }

        }

        div.edit-note {
            //text-align: center;
            button {
                opacity: 0.9;
                font-size: 14px;
                background: none;
                border: none;
                box-shadow: none;
                color: rgba(0, 0, 0, 0.4);
                font-weight: bold;
                text-decoration: underline;
            }

            textarea {
                border-radius: 4px;
                background-color: #efefef;
                border: none;
                padding: 14px 14px;
                width: 100%;
                box-sizing: border-box;
                min-height: 125px;
                line-height: 1.4em;
                font-size: 15px;
                margin: 8px 0px;
                outline-style: none;
            }
            
        }
    }


    .submit {
        height: 65px;
        padding: 0px 20px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top: 1.4px solid #eeeeee;
        background-color: #f6f6f6;
        font-weight: bold;

        button {
            border-style: none;
            font-size: 14px;
        }

        button.delete {
            svg {
                fill: #9e9e9e;
            }

            padding: 1px 4px;
            background-color: #0000;
        }

        button.cancel {
            padding: 1px 16px;
            background-color: #0000;
            color: #9e9e9e;

            height: 34px;
            border-radius: 9px;
        }

        button.save {
            padding: 1px 16px;
            background-color: rgb(69, 71, 75);
            color: white;

            height: 34px;
            border-radius: 9px;
        }
    }
}
</style>
