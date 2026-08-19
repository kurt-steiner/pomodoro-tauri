import Database from '@tauri-apps/plugin-sql'
import type { ITask } from './model/task'


export const insert_one = async (db: Database, task: ITask): Promise<ITask> => {
  let sql = "insert into tasks (title, is_done, expect_pomodoro_count, actual_pomodoro_count, note) values ($1, $2, $3, $4, $5)"
  const result = await db.execute(sql, [task.title, task.is_done ? 1 : 0, task.expect_pomodoro_count, task.actual_pomodoro_count, task.note])

  let id = result.lastInsertId!!
  const new_task = await select_one(db, id)
  return new_task!!
}

export const select_one = async (db: Database, id: number): Promise<ITask | null> => {
  if (id <= 0) {
    throw new Error("id <= 0")
  }

  let sql = "select * from tasks where id = $1"
  const result = await db.select<ITask[]>(sql, [id])

  if (result.length == 0) {
    return null;
  } else {
    return result[0]
  }
}

export const select_all = async (db: Database): Promise<ITask[]> => {
  let sql = "select * from tasks";
  const result = await db.select<ITask[]>(sql)
  
  return result
}

export const update_one = async (db: Database, task: ITask): Promise<ITask> => {
  if (task.id <= 0) {
    throw new Error("id <= 0")
  }

  let sql = "update tasks set title = $1, is_done = $2, expect_pomodoro_count = $3, actual_pomodoro_count = $4, note = $5, next_id = $6 where id = $7"
  await db.execute(sql, [task.title, task.is_done ? 1 : 0, task.expect_pomodoro_count, task.actual_pomodoro_count, task.note, task.next_id, task.id])

  const result = await select_one(db, task.id)
  return result!!
}

export const delete_one = async (db: Database, task: ITask): Promise<void> => {
  if (task.id <= 0) {
    throw new Error("id <= 0")
  }

  let sql = "delete from tasks where id = $1"
  await db.execute(sql, [task.id])
}


export const delete_all = async (db: Database): Promise<void> => {
  console.log("donnot use this function in production environment")
  let sql = "delete from tasks"
  await db.execute(sql)
}