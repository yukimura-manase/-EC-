import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import React, { useState } from "react"
import { detailRamen } from '../actions/ActionCreator';
//materialUI
import { createStyles,makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
        "style":{
            textAlign:"center",
            paddingBottom:"20px",
            fontWeight:700
        },
        "picture":{
            width:"500px",
            height:"350px",
            paddingTop:"15px",
            paddingBottom:"15px"
        },
        "checkbox":{
            padding: "0.5em 1em",
            margin: "2em 0",
            color: "#232323",
            background: "#fff8e8",
            borderLeft: "solid 10px #faa61a",
            width:"85%",
            display:"inline-block"
        },
        "text":{
            fontSize:"25px",
        },
        "errortext":{
            color:"red",
            fontWeight:700
        },
        "button":{
            borderColor:"#faa61a",
            color:"#faa61a",
            fontWeight:600,
            marginBottom:"8px",
            backgroundColor:"#fff",
            padding:"10px",
            "&:hover":{
                backgroundColor:"#faa61a",
                color:"#fff"
            }
        },
        "size":{
            paddingBottom:"15px",
            paddingTop:"15px"
        },
        "number":{
            fontSize:"18px",
            paddingBottom:"15px"

        },
        "price":{
            fontSize:"18px",
            paddingBottom:"15px"
        },
        "u":{
            textDecoration:"none",
            borderBottom:"double 5px #faa61a",
        }
    }),
);

const ramenSelector = state => {
    return state.StoreState.ramen
}

export const Detail = ()=>{

    const classes = useStyle();

    const ramenData = useSelector(ramenSelector)

    const {id} = useParams()
    //console.log({id}) // URLパラメータなので、文字列として受け取る！
    
    const getRamen = ramenData.find( ramen => ramen.id === Number(id)) // ramen.idはnumber型、Paramsのidはstring型

    // 選択されたサイズのデータを保持する
    const [size, setSize] = useState('')

    const [toppinglist, addTopping] = useState([]) // トッピングを入れる配列

    const setTopping = (e)=> {

        if(toppinglist.includes(e.target.value)){ // 含まれていればtrue！
            addTopping( toppinglist.filter(topping => topping !== e.target.value) ) // e.target.valueを除外したtopping配列を生成
        } else {
            addTopping( [...toppinglist, e.target.value] )
        }
    }

    const [quantity,setQuantity] = useState(1) //数量

    let setNumber = (e) => setQuantity(e.target.value) // 数量をセットする

    let totalPrice = () => {
        if(size === "M"){
            return getRamen.Msizeprice * quantity + toppinglist.length * 200 * quantity
        }else if(size === "L"){
            return getRamen.Lsizeprice * quantity + toppinglist.length * 300 * quantity
        }
    }


    const [checkResult, setCheck] = useState('')

    const history = useHistory()
    const handleLink = path => history.push(path)

    const dispatch = useDispatch()

    const goCart = ()=> {
        if(size === ''){
            setCheck('サイズを選択してください！')
        } else {
            let selectRamen = { id:Number(id), size:size, topping:toppinglist, number:quantity, total:totalPrice() }
            
            dispatch(detailRamen(selectRamen))
            handleLink('/cart')
        }
    }



    return (
        <div className={classes.style}>
            <h1>ラーメン詳細画面</h1>
           
                <div className={classes.text}><u className={classes.u}>商品名：{getRamen.name}</u></div>
                <div><img src={getRamen.pic} className={classes.picture} /></div>
                <div>商品説明：{getRamen.detail}</div>

                <div className={classes.size}><u className={classes.u}>サイズ選択</u></div>

                <label htmlFor='M'> <input type='radio' name='button' id='M' value='M' onClick={ ()=>{setSize('M')}  } /> Mサイズ {getRamen.Msizeprice} 円(税抜)</label>
                <label htmlFor='L'> <input type='radio' name='button' id='L' value='L' onClick={ ()=>{setSize('L')}  } /> Lサイズ {getRamen.Lsizeprice} 円(税抜)</label>
                

               

                <div name="topping" className={classes.checkbox}>    
                    <div>トッピング：１つにつき M 200円(税抜) L 300円(税抜)</div>
                    <label htmlFor='チャーシュー'><input type="checkbox" id='チャーシュー' value="チャーシュー" onChange={setTopping}/>チャーシュー</label>&nbsp;
                    <label htmlFor='煮たまご'><input type="checkbox" id='煮たまご' value="煮たまご" onChange={setTopping}/>煮たまご</label>&nbsp;
                    <label htmlFor='メンマ'><input type="checkbox" id='メンマ' value="メンマ"　onChange={setTopping}/>メンマ</label>&nbsp;
                    <label htmlFor='のり'><input type="checkbox" id='のり' value="のり" onChange={setTopping}/>のり</label>&nbsp;
                    <label htmlFor='もやし'><input type="checkbox" id='もやし' value="もやし" onChange={setTopping}/>もやし</label>&nbsp;
                    <label htmlFor='ほうれん草'><input type="checkbox" id='ほうれん草' value="ほうれん草"　onChange={setTopping}/>ほうれん草</label>&nbsp;
                    <label htmlFor='車麩'><input type="checkbox" id='車麩' value="車麩" onChange={setTopping}/>車麩</label>&nbsp;
                    <label htmlFor='バター'><input type="checkbox" id='バター' value="バター"　onChange={setTopping}/>バター</label>&nbsp;
                    <label htmlFor='白髪ねぎ'><input type="checkbox" id='白髪ねぎ' value="白髪ねぎ" onChange={setTopping}/>白髪ねぎ</label>&nbsp;
                    <label htmlFor='紫たまねぎ'><input type="checkbox" id='紫たまねぎ' value="紫たまねぎ"　onChange={setTopping}/>紫たまねぎ</label>&nbsp;
                    <label htmlFor='うずら煮卵'><input type="checkbox" id='うずら煮卵' value="うずら煮卵" onChange={setTopping}/>うずら煮卵</label>&nbsp;
                    <label htmlFor='薫製たまご'><input type="checkbox" id='薫製たまご' value="薫製たまご" onChange={setTopping}/>薫製たまご</label>&nbsp;
                    <label htmlFor='つみれ'><input type="checkbox" id='つみれ' value="つみれ" onChange={setTopping}/>つみれ</label>&nbsp;
                    <label htmlFor='ワンタン'><input type="checkbox" id='ワンタン' value="ワンタン" onChange={setTopping}/>ワンタン</label>&nbsp;
                    <label htmlFor='ザーサイ'><input type="checkbox" id='ザーサイ' value="ザーサイ" onChange={setTopping}/>ザーサイ</label>&nbsp;
                    <label htmlFor='大トロチャーシュー'><input type="checkbox" id='大トロチャーシュー' value="大トロチャーシュー" onChange={setTopping}/>大トロチャーシュー</label>&nbsp;
                    <label htmlFor='太麺に変更'><input type="checkbox" id='太麺に変更' value="太麺に変更" onChange={setTopping}/>太麺に変更</label>&nbsp;
                    <label htmlFor='追い飯'><input type="checkbox" id='追い飯' value="追い飯" onChange={setTopping}/>追い飯</label>
                </div>


               
                <div>数量:
                    <select name="number"　onChange={setNumber} className={classes.number} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>

                <div className={classes.price}><u className={classes.u}>選択商品の合計金額：{totalPrice()}円</u></div>

                <div><button onClick={ ()=>{ goCart() } } className={classes.button} >カートに入れる</button></div>
                <div className={classes.errortext}>{checkResult}</div>
           
            
        </div>

    )
}

