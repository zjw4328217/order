const oneDataList =(prevState=null,action) => {
    let {type,payload} =action
    switch(type){
        case 'MOneDataList':
            return payload;
            default:
                return prevState
    }
}

export default oneDataList