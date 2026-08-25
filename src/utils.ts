interface Item {
    id : number
    next_id : number | null
}

const move_up = (items: Item[], from_index: number, to_index: number) => {
    if (from_index < 0 || from_index > items.length - 1) {
        throw new Error("from index out of bounds");
    }

    if (to_index < 0) {
        throw new Error("to_index < 0");
    }

    // assert from_index > to_index
    if (from_index <= to_index) {
        throw new Error("from index <= to index")
    }

    // 边界情况
    if (items.length == 0 || items.length == 1) {
        return;
    } 
    
    // 一般情况
    // 处理 prev_item, prev of from_index
    let prev_item = items[from_index - 1];
    let item = items[from_index];
    let item_copied = {...item};
    prev_item.next_id = item.next_id;

    // 处理 current_item (from_item)
    if (to_index == 0) {
        item_copied.next_id = items[to_index].id
    } else {
        let index = to_index - 1;
        items[index].next_id = item_copied.id;
    }

    item_copied.next_id = items[to_index].id;

    // 移动 items[to_index : from_index - 1] -> items[to_index + 1 : from_index]
    for (let index = from_index - 1; index >= to_index; index -= 1) {
        items[index + 1] = items[index]
    }

    // 拷贝 items[from_index] (copied) -> items[to_index]
    items[to_index] = item_copied
}

const move_down = (items: Item[], from_index: number, to_index: number) => {
    if (from_index < 0) {
        throw new Error("from index < 0");
    }

    if (to_index < 0 || to_index > items.length - 1) {
        throw new Error("to_index out of bounds");
    }

    // assert from_index > to_index
    if (from_index >= to_index) {
        throw new Error("from index >= to index")
    }

    // 边界情况
    if (items.length == 0 || items.length == 1) {
        return;
    }

    // 一般情况
    // 处理 current_item (from_index)
    let item = items[from_index];
    let item_copied = {...item};

    if (to_index == items.length - 1) { // 边界情况
        items[to_index].next_id = item_copied.id;
        item_copied.next_id = null;
    } else {
        items[to_index].next_id = item_copied.id;
        let next_item = items[to_index + 1]; // next of to_index
        item_copied.next_id = next_item.id;
    }

    // 移动 items[from_index + 1 : to_index] -> items[from_index : to_index - 1]
    for (let index = from_index; index <= to_index - 1; index += 1) {
        items[index] = items[index + 1];
    }

    // 拷贝
    items[to_index] = item_copied
}

export {
    move_up,
    move_down
};