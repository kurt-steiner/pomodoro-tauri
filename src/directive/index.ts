import type { Directive } from "vue";

type AlignSelf = "auto" | "baseline" | "center" | "end" | "first-baseline" | "flex-end" | "flex-start" | "inherit" | "initial" 
    | "last-baseline" | "normal" | "revert" | "revert-layer" | "safe" | "safe-end" | "self-start" | "start" | "stretch" | "unsafe" | "unset"
    

const align_self: Directive<HTMLElement, AlignSelf | undefined> = {
    mounted(el, binding) {
        const parent = el.parentElement;
        let parent_style: CSSStyleDeclaration | undefined = undefined

        if (parent != null) {
            parent_style = getComputedStyle(parent)
            let parent_display = parent_style.display
            if (parent_display != "flex" && parent_display != "inline-flex" && parent_display != "grid" && parent_display != "inline-grid") {
                throw new Error("cannot set align-self property when not in a flex layout")
            }    
        }

        
        let binding_value = binding.value;

        if (binding_value === undefined) {
            binding_value = "unset"
        }

        el.style.alignSelf = binding_value
    }
}

export {align_self}