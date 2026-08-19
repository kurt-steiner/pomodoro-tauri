import { test } from "vitest";

interface ITask {
    id: number
    next_id: number | null
}

const select_tasks = (tasks: ITask[]): ITask[] => {
    if (tasks.length == 0 || tasks.length == 1) {
        return tasks
    }

    let result: ITask[] = [];

    // 先找尾节点
    let tail_task = tasks.find(task => task.next_id == null)
    if (tail_task === undefined) {
        throw new Error("undefined tail")
    }

    result.push(tail_task)

    while (true) {
        let next_task = tasks.find(task => task.next_id == tail_task!.id)
        if (next_task === undefined) {
            break;
        }

        result.push(next_task)
        tail_task = next_task
    }
    
    return result.reverse();
}

test('select tasks', async () => {
    const tasks: ITask[] = [
        {
            id: 1, next_id: 3
        },
        {
            id: 2, next_id: 4
        },
        {
            id: 3, next_id: null
        },
        {
            id: 4, next_id: 1
        }
    ]

    const result = select_tasks(tasks)
    result.forEach(value => console.log(value))
    
})