const collapsedReducer = (prevState = false, action) => {
    let { type, payload } = action
    switch (type) {
        case 'MySideMenu':
            return payload
        default:
            return prevState
    }
}

export default collapsedReducer



