// reducersでStateの更新処理をする際のtype判別や、処理に使うデータ(Actions)を作成する関数たちのファイル(ActionCreator)
export const SETLOGINUSER = 'setLoginUser'
export const DELETELOGINUSER = 'deleteLoginUser'
export const FETCHRAMEN = 'fetchRamen'
export const FETCHCARTITEM = 'fetchCartItem'
export const ADDLIKE = 'addLike'
export const DETAILRAMEN = 'detailRamen'
export const REMOVECART = 'removeCart'
export const REMOVELIKE = 'removeLike'
export const ADDNEWCART = 'addNewCart'
export const DELETECART = 'deleteCart'

export const setLoginUser = (user)=> {
    return {
        type:SETLOGINUSER,
        user:user
    }
}

export const deleteLoginUser = ()=> {
    return {
        type:DELETELOGINUSER
    }
}

export const fetchRamen = (ramenProducts)=> {
    return {
        type:FETCHRAMEN,
        ramenProducts:ramenProducts
    }
}

export const fetchCartItem = (cartItem)=>{
    return {
        type:FETCHCARTITEM,
        cartItem:cartItem
    }
}

export const addLike = (likeRamen)=>{
    return {
        type:ADDLIKE,
        likeRamen:likeRamen
    }
}

export const detailRamen = (selectRamen)=> {
    return {
        type:DETAILRAMEN,
        selectRamen:selectRamen
    }
}

export const removeCart = (removeIndex)=> {
    return {
        type:REMOVECART,
        index:removeIndex
    }
}

export const removeLike = (index)=> {
    return {
        type:REMOVELIKE,
        index:index
    }
}

export const addNewCart = (newCart) => {
    return {
        type:ADDNEWCART,
        newCart:newCart
    }
}

export const deleteCart = () => {
    return{
        type:DELETECART
    }
}