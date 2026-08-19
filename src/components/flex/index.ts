type FlexDirection = "column" | "row"
type MainAxisSize = "min" | "max" 

type CrossAxisAlignment = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly" 
type MainAxisAlignment = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly" 

export type {
    FlexDirection,
    MainAxisSize,
    CrossAxisAlignment,
    MainAxisAlignment
}

import Column from "./column.vue"
import Row from "./row.vue"
import Expanded from "./expanded.vue"

export {
    Column,
    Row,
    Expanded
}