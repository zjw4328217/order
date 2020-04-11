const orderInfo=(prevState={},action) =>{
    let{type,payload} =action
    switch(type){
        case 'MOrderInfo':
            return payload;
            default:
                return prevState
    }
}

export default orderInfo