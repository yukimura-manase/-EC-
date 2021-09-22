import React, { useEffect } from 'react';

import { // ルーティング設定
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom' // Router設定仮置き

// ReduxStoreとのやり取り
import { useDispatch } from 'react-redux';

// ActionCreatorとのやり取り
import { setLoginUser, deleteLoginUser, fetchRamen,fetchCartItem } from '../actions/ActionCreator'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth' // authentication機能にアクセス
import 'firebase/compat/firestore' // firestore機能にアクセス
import  '../service/firebase' // 設定ファイルを読み込み

import { Header } from './Header';
import { Home } from './Home';
import { Cart } from './Cart';
import { Like } from './Like';
import { Detail } from './Detail';
import { Order } from './Order';
import { OrderFinish } from './OrderFinish';

//materialUI
import { createStyles,makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
      "header":{
        width:"35%",
      },
      "pic":{
        textAlign:"center",
        backgroundColor:"#faa61a"
      }
    }),
  );

const App = ()=> {

  const classes = useStyle();

  const dispatch = useDispatch()


  const setUser = (user)=> {
    dispatch(setLoginUser(user))
  }

  const deleteUser = () => {
    dispatch(deleteLoginUser())
  }

  const fetchProducts = ()=> { // 画面生成時に商品情報をDBから取って参る！
    const ramenProducts = []
    firebase
      .firestore()
      .collection(`products`)
      .get()
      .then(
        snapshot => {
          snapshot.forEach(doc => {
            ramenProducts.push(doc.data())
          })
          dispatch(fetchRamen(ramenProducts))
        }
      )
  }

  const fetchCart = (user) => {
    let cartItem = []
    firebase
      .firestore()
      .collection(`users/${user.uid}/carts`)
      .get()
      .then(snapshot => {
        //console.log(snapshot)　// クエリスナップショット

        if (snapshot.empty) { // 1回目は、true。2回目以降の利用はfalse
          firebase
            .firestore()
            .collection(`users/${user.uid}/carts`)
            .add(
              {
                orderDate: "",
                userName: "",
                mailAddress: "",
                addressNumber: "",
                address: "",
                phoneNumber: "",
                deliveryDate: "",
                deliveryTime: "",
                status: 0,
                cartItemList: [],
                likeItemList: []
              }
            ).then(doc => {
              //console.log(doc)
              cartItem.push(
                {
                  id: doc.id,
                  orderDate: "",
                  userName: "",
                  mailAddress: "",
                  addressNumber: "",
                  address: "",
                  phoneNumber: "",
                  deliveryDate: "",
                  deliveryTime: "",
                  status: 0,
                  cartItemList: [],
                  likeItemList: []
                }
              )
            })
        }
        snapshot.forEach((doc) => {

          // console.log(doc) //ドキュメントスナップショット 
          // console.log(doc.data()) // ドキュメントスナップショットのデータを取ってくる

          // cartItemにstatus0のカート情報をpushして、idも付与して、Storeに保存する。
          if (doc.data().status === 0) { // 2回目以降は、status0のカートだけReduxStoreのStateに保存する。
            cartItem.push({ ...doc.data(), id: doc.id }) 
          }
        })
          dispatch(fetchCartItem(cartItem))
      })
  }


  const setCart=()=>{
    let cartItem = []
    cartItem.push({
      orderDate: "",
      userName: "",
      mailAddress: "",
      addressNumber: "",
      address: "",
      phoneNumber: "",
      deliveryDate: "",
      deliveryTime: "",
      status: 0,
      cartItemList: [],
      likeItemList: []
    })
    dispatch(fetchCartItem(cartItem))
  }

  useEffect(
    ()=>{

        firebase.auth().onAuthStateChanged(user => {
          if(user){
            setUser(user)
            fetchCart(user)
          } else {
            deleteUser() // ログアウトユーザーのユーザーデータ&カート情報をStateから消す！
            setCart() // 空のカート情報をセットする。
          }
        })

        fetchProducts()
      
    },[]
  )

  return (
    <React.Fragment>
      <Router>

        <div className={classes.pic} >
          <img src={`${process.env.PUBLIC_URL}/pic/header_logo.png`} alt="Logo" className={classes.header} />
        </div>
        <Header />

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/like' exact component={Like} />
          <Route path='/detail/:id' exact component={Detail} />
          <Route path='/order' exact component={Order} />
          <Route path='/orderfinish' exact component={OrderFinish} />
        </Switch>

      </Router>
    </React.Fragment>
  )
}



export default App;
