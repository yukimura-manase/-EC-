import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createStyles,makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
  createStyles({
    "right":{
      textAlign:"right",
    },
    "buttonStyle":{
      fontWeight:700,
      fontSize:"17px",
      border:"none",  /* 枠線を消す */
      outline: "none", /* クリックしたときに表示される枠線を消す */
      background:"transparent", /* 背景の灰色を消す */
      "&:hover":{
        backgroundColor:"#faa61a",
        color:"#fff"
    }

    }
  }),
);

const LoginSelector = (state)=>{
   return state.StoreState.loginUser
}



export const Header = ()=>{

  const classes = useStyle();

  const history = useHistory()
  const handleLink = path => history.push(path)

  const user = useSelector(LoginSelector)

  const login=()=>{
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
  }

  const logout=()=>{
      firebase.auth().signOut();
  }

  const Logbutton=()=>{
      if(user){
        return(
          <button onClick={logout} className={classes.buttonStyle} >ログアウト</button>
          )
        }else{
          return(
          <button onClick={login} className={classes.buttonStyle} >ログイン</button>
        )
      }
    }


  return (
      <header>
        <div className={classes.right}>
          <button onClick={ ()=>{handleLink('/')} } className={classes.buttonStyle} >商品一覧へ</button>
          <button onClick={ ()=>{handleLink('/cart')} } className={classes.buttonStyle} >ショッピングカートへ</button>
          {
            user === null ?
            true : <button onClick={ ()=>{handleLink('/like')} } className={classes.buttonStyle} >お気に入りラーメン</button>
          }

          <Logbutton />
        </div>
      </header>
    )
}