const orderBuild=(prevState=null,action) =>{
    let{type,payload} =action
    switch(type){
        case 'MOrderBuild':
            return payload;
            default:
                return prevState
    }
}

export default orderBuild