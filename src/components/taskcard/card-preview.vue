<template>
    <div class="taskcard" :class="{'selected': selected}">
        <Row class="taskcard-info" main-axis-size="max" cross-axis-alignment="center" @click.self="toggle_select">
            <Row cross-axis-alignment="center" :class="{'done': task.is_done}">
                <div class="icon isdone" v-html="icon_isdone" @clikc="toggle_done"/>
                <SizedBox width="10px"/>
                <span class="title"> {{ task.title }}</span>
            </Row>

            <Expanded/>

            <Row cross-axis-alignment="center">
                <div class="fraction">
                    {{ task.actual_pomodoro_count }}/{{ task.expect_pomodoro_count }}
                </div>

                <div class="icon-button">
                    <button @click="toggle_expand">
                        <div class="icon more" v-html="icon_more"/>
                    </button>
                </div>
            </Row>
        </Row>

        
        <template v-if="task.note != null">
            <div class="note">
                <div class="note-preview">
                    <p>
                        <template v-for="(note, index) in note_splits" :key="index">
                            <span>{{ note }}</span> <br>
                        </template>
                    </p>
                </div>
            </div>
        </template>
        
    </div>
</template>

<script lang="ts" setup>
import type {ITask} from '@/model/task';
import {Row, Expanded} from '@/components/flex';
import SizedBox from "@/components/sizedbox.vue"

import icon_isdone from '@/assets/isdone.svg?raw'
import icon_more from '@/assets/more.svg?raw'
import { computed } from 'vue';

const emits = defineEmits<{
    select: [],
    expand: [],
    done: [boolean]
}>()

const props = withDefaults(
    defineProps<{
        task: ITask,
        selected ?: boolean
    }>(),

    {
        selected: false
    }
)

const toggle_select = () => {
    emits("select")
}

const toggle_expand = () => {
    emits("expand")
}

const toggle_done = () => {
    emits("done", !props.task.is_done)
}

const note_splits = computed(() => {
    return props.task.note?.split('\n') ?? []
})
</script>

<style lang="scss" scoped>
.taskcard {
    background-color: white;
    border-radius: 4px;

    &.selected {
        border-left: 6px solid black;
    }

    border-left: 6px solid white;

    .taskcard-info {
        // box-sizing: border-box;
        padding-top: 18px;
        padding-bottom: 18px;
        padding-left: 14px;
        padding-right: 14px;
        border-radius: 4px;
        // background-color: white;

        .icon {
            display: block;
            width: 24px;
            height: 24px;

            &.icon.isdone {
                color: rgba(0, 0, 0, 0.2);
            }
        }
        
        .done {
            .icon.isdone {
                color: rgba(255, 0, 0, 0.6);
            }

            span.title {
                text-decoration: line-through;
                color: grey;
            }
        }
        

        .title {
            font-weight: 500;
            font-size: 20px;
            line-height: 20px;

            &.isdone {
                text-decoration: line-through;
            }
        }


        .fraction {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.3);
            font-weight: 500;
        }

        .icon-button {
            width: 30px;
            margin-left: 14px;

            button {
                cursor: pointer;
                border: 1px solid #dfdfdf;
                border-radius: 4px;
                padding: 2px;
                background-color: white;

                .icon.more {
                    fill: black;
                }
            }

            
        }
        
    }

    .note {
        padding-left: 30px;
        padding-bottom: 12px;
        padding-right: 18px;
    }

    .note-preview {
        
        border-radius: 8px;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
        background-color: hsl(51, 84%, 93%);

        p {
            margin-top: 0;
            margin-bottom: 0;
            white-space: pre-wrap;
            padding: 10px 12px;
            word-break: break-word;
        }
    }
}
</style>