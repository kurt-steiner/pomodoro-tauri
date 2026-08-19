<template>
    <main
        class="container"
        :style="{ 'background-color': state.background_color }">
        <Column>
            <Pomodoro/>
            <Sizedbox height="1000px">
                <button @click="test_insert">test insert</button>
                <button @click="test_select_all">test select all</button>
                <button @click="test_update">test update</button>
                <button @click="test_reorder">test reorder</button>
                <button @click="reset">reset</button>
            </Sizedbox>
        </Column>
    </main>

    <FloatingActionButton @click="handle_fab_click"/>
</template>

<script setup lang="ts">
import Pomodoro from "./components/pomodoro/pomodoro.vue";
import {Task} from "./model/task";
import Sizedbox from "./components/sizedbox.vue";
import { Column } from "./components/flex/index.ts";
import { usePomodoroStore } from "./store";
import { onMounted } from "vue";
import FloatingActionButton from "./components/floating-action-button.vue";

const state = usePomodoroStore();

const handle_fab_click = () => {

}

const test_insert = async () => {
  let task = new Task(1, "hello", 2)
  await state.insert_task(task)
}

const test_select_all = async () => {
  let tasks = await state.select_tasks()
  console.log(tasks)
}

const test_update = async () => {
  let filtered = state.tasks.filter((task) => task.id == 5)
  if (filtered.length == 0) {
    return;
  }

  let task = filtered[0]
  task.title = "fuck"
  task.actual_pomodoro_count = 3

  const result = await state.update_task(task)
  console.log("after update")
  console.log(result)
}

const test_delete = async () => {

}

const test_reorder = async () => {

}

const reset = async () => {
  await state.delete_all_tasks()
  // TODO next_id 如何设置？
  let tasks: Task[] = []

  for (let count = 1; count <= 10; count += 1) {
    let task = new Task(1, `${count}`, 2)
    tasks.push(task)
  }

  for (let index = 0; index <= 8; index += 1) {
    let current_task = tasks[index]
    let next_task = tasks[index + 1];

    current_task.next_id = next_task.id
  }

  for (let task of tasks) {
    await state.insert_task(task)
  }
}

onMounted(async () => {
  await state.load_database()
})

</script>

<style lang="scss" scoped>
main.container {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    font-family:
        "ArialRounded",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Helvetica,
        Arial,
        sans-serif,
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol";
}
</style>
