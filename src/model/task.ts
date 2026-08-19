interface ITask {
    id: number
    title: string
    is_done: boolean
    expect_pomodoro_count: number
    actual_pomodoro_count: number

    note : string | null,
    next_id: number | null
}


class Task implements ITask {
    public readonly id: number
    public title: string
    public is_done: boolean
    public expect_pomodoro_count: number
    public actual_pomodoro_count: number

    public note : string | null
    public next_id: number | null

    public constructor(id: number, title: string, expect_pomodoro_count: number) {
        this.id = id
        this.title = title
        this.is_done = false
        this.expect_pomodoro_count = expect_pomodoro_count
        this.actual_pomodoro_count = 0
        this.note = null
        this.next_id = null
    }

    public count_once() {
        this.actual_pomodoro_count += 1
    }

    public toggle() {
        this.is_done = !this.is_done
    }

    public clear_count() {
        this.actual_pomodoro_count = 0
    }
}

export type {
  ITask,
};

export {
  Task
}
