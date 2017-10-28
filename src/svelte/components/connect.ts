import shallowEqual from "../../utils/shallowEqual"
import bindActions from "../../utils/bindActions"

export function getActions(store, actions) {
    return bindActions(
        typeof actions === "function" ? actions(store) : actions,
        store
    )
}

function getDiff(newData, oldData) {
    const diff = { }
    let changed = false
    for (let key in newData) {        
        if (!shallowEqual(oldData[key], newData[key])) {
            changed = true
            diff[key] = newData[key]
        }
    }
    return { diff, changed }
}

export function connect(component, store, mapToProps) {
    update()
    component.on("destroy", store.subscribe(update))
    function update() {
        const { diff, changed } = getDiff(mapToProps(store.getState()), component.get())
        if (changed) {
            component.set(diff)
        }
    }
}