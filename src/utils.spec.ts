import {test} from 'vitest'
import { move_up, move_down } from './utils'



test('move(1)', () => {
    const items = [
        {
            id: 1,
            next_id: 2,
        },
        {
            id: 2,
            next_id: 3
        },
        {
            id: 3,
            next_id: 4
        },
        {
            id: 4,
            next_id: 5
        },

        {
            id: 5,
            next_id: 6
        }
    ]

    move_up(items, 3, 1)

    items.forEach(item => {
        console.log(`id: ${item.id}, next_id: ${item.next_id}`)
    })
})


test('move(2)', () => {
    const items = [
        {
            id: 1,
            next_id: 2,
        },
        {
            id: 2,
            next_id: null
        }
    ]

    move_up(items, 1, 0)

    items.forEach(item => {
        console.log(`id: ${item.id}, next_id: ${item.next_id}`)
    })
})


test('move down', () => {
    const items = [
        {
            id: 1,
            next_id: 2,
        },
        {
            id: 2,
            next_id: null
        }
    ]

    move_down(items, 0, 1)
    items.forEach(item => {
        console.log(`id: ${item.id}, next_id: ${item.next_id}`)
    })
})

test('move down(2)', () => {
    const items = [
        {
            id: 1,
            next_id: 2,
        },
        {
            id: 2,
            next_id: 3
        },
        {
            id: 3,
            next_id: 4
        },
        {
            id: 4,
            next_id: 5
        },

        {
            id: 5,
            next_id: null
        }
    ]

    move_down(items, 0, 3)
    items.forEach(item => {
        console.log(`id: ${item.id}, next_id: ${item.next_id}`)
    })
})

test("move recovery", () => {
     const items = [
        {
            id: 1,
            next_id: 2,
        },
        {
            id: 2,
            next_id: 3
        },
        {
            id: 3,
            next_id: 4
        },
        {
            id: 4,
            next_id: 5
        },

        {
            id: 5,
            next_id: null
        }
    ]

    move_down(items, 0, 2)
    move_up(items, 2, 0)

    items.forEach(item => console.log(`id: ${item.id}, next_id: ${item.next_id}`))
})