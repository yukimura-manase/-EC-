import firebase from 'firebase/compat/app'


import { SETLOGINUSER, DELETELOGINUSER, FETCHRAMEN, FETCHCARTITEM, ADDLIKE, DETAILRAMEN, REMOVECART, REMOVELIKE, DELETECART, ADDNEWCART } from "../actions/ActionCreator"

const initialState = {
    loginUser:null,
    ramen:[],
    cart:[],
}

export const StoreState = ( state = initialState, action )=> {

    switch(action.type){
        case SETLOGINUSER: {
            return { ...state,loginUser:action.user }
        }
        case DELETELOGINUSER: {
            return { ...state, loginUser:null, cart:[] }
        }
        case FETCHRAMEN: {
            return { ...state, ramen:action.ramenProducts }
        }
        case FETCHCARTITEM: {
            return { ...state, cart:action.cartItem}
        }
        case ADDLIKE: {
            const copyCart = state.cart.slice()
            copyCart[0].likeItemList.push(action.likeRamen)

            firebase.firestore()
                .collection(`users/${state.loginUser.uid}/carts`)
                .doc(copyCart[0].id)
                .update( { likeItemList: copyCart[0].likeItemList } )

            return { ...state, cart:copyCart }
        }
        case DETAILRAMEN: {
            const copyCart = state.cart.slice()
            copyCart[0].cartItemList.push(action.selectRamen)
            console.log(copyCart)

            firebase.firestore()
                .collection(`users/${state.loginUser.uid}/carts`)
                .doc(copyCart[0].id)
                .update( { cartItemList: copyCart[0].cartItemList　} )

            return { ...state, cart:copyCart }
        }
        case REMOVECART: {
            const copyCart = state.cart.slice()
            copyCart[0].cartItemList.splice(action.index,1)

            firebase.firestore()
                .collection(`users/${state.loginUser.uid}/carts`)
                .doc(copyCart[0].id) // 自動ID => copyCart[0].id
                .update( {cartItemList:copyCart[0].cartItemList} ) 

            return { ...state, cart:copyCart }
        }
        case REMOVELIKE: {
            const copyCart = state.cart.slice()
            copyCart[0].likeItemList.splice(action.index,1)

            firebase.firestore()
                .collection(`users/${state.loginUser.uid}/carts`)
                .doc(copyCart[0].id) // 自動ID => copyCart[0].id
                .update( {likeItemList:copyCart[0].likeItemList} ) 

            return { ...state, cart:copyCart }
        }

        case DELETECART:{
            const NoCart = []
            return { ...state, cart:NoCart }
        }

        case ADDNEWCART:{
            let copyCart = state.cart.slice()
            copyCart = action.newCart

            return { ...state, cart: copyCart }
        }
        default:
            return state
    }
}

