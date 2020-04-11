const stateList=(prevState=[],action)=>{
    let {type ,payload} =action
    switch(type) {
        case 'MStateList':
            return payload;
            default:
                return prevState
    }
}

export default stateList