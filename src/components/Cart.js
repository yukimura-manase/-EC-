import React, {useState,useEffect} from 'react'
import { removeCart } from '../actions/ActionCreator';
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createStyles,makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
        "text":{
            textAlign:"center",
            fontWeight:600
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
        "pic":{
            width: "350px",
            height: "200px"
        },
        "tableWidth":{
            width:"80%",
            margin:"3px auto",
            paddingTop:"30px",
            paddingBottom:"30px"
        },
        "cartTitle":{
            background:"#ffab4c",
            fontSize:"10px",
            color:"#fff"

        },
        "tableBody":{
            background:"#ffead6"
        },
        "u":{
            textDecoration:"none",
            borderBottom:"double 5px #faa61a",
        },
        "price":{
            fontSize:"18px",
            paddingBottom:"15px"
        }



    }),
);

const loginSelector = state=>{ 
    return state.StoreState.loginUser
}

const cartSelector = state => { 
    console.log(state)
    return state.StoreState.cart
}

const ramenSelector = state => {
    return state.StoreState.ramen
}

export const Cart = ()=> {

    const classes = useStyle();

    const user = useSelector(loginSelector)
    
    const cartData = useSelector(cartSelector)

    const ramenData = useSelector(ramenSelector)

    const history = useHistory();
    const handleLink = path =>history.push(path);
    
    const dispatch = useDispatch()

    const 
   [ ramens, setRamen ] = useState([]),
   [ carts, setCart ] = useState([]),
   [ carts2 , setCart2 ] = useState([]),
   [ randomramen, setRandom ] = useState('')

   useEffect(
    ()=>{
        ramenData.length !==0 && setRamen(ramenData) // StoreState???????????????????????????????????????????????????set?????????
        cartData.length !== 0 &&  setCart(cartData[0].cartItemList)

        if( cartData.length !== 0 && ramenData.length !==0 ){

            const cartIdList =  carts.map( cart => cart.id) //????????????????????????ID??????????????????

            let macthRamenData = cartIdList.map( cartid => {
                return ramens.find(ramen => cartid === ramen.id) // id?????????????????????????????????
            })

            const mergeArray = [] // ???????????????

            carts.forEach(cart => {
                let idMatchRamen = macthRamenData.find( ramendata => ramendata.id === cart.id) // id???????????????????????????????????????
                const merged = { ...cart,...idMatchRamen }  
                mergeArray.push(merged)
            })
            cartData.length !== 0 && setCart2(mergeArray)

        }

    },[cartData,ramenData,carts,ramens])

    const totalTax = ()=>{ // ???????????????????????????
        let tax = []
        carts.forEach(cart => {
            tax.push(cart.total * 0.1)
        })

        let totalTax = tax.reduce( (sum,currentVal ) => {
            return sum + currentVal;
        },0) // ?????????????????????????????????
        return totalTax
    }

    const sumTotalPlice = ()=>{ // ????????????(total)?????????????????????????????????
        let taxInclude = []
        carts.forEach(cart => {
        taxInclude.push(cart.total * 1.1)
        })
        let totalTaxIncludes = taxInclude.reduce( (sum,currentVal) => {
            return sum + currentVal;
        },0)
        return Math.floor(totalTaxIncludes)
    }

    const remove = (removeIndex)=>{
        
        const copyCart2 = carts2.concat()
        copyCart2.splice(removeIndex,1)

        console.log(copyCart2)
        setCart2(copyCart2)

        dispatch(removeCart(removeIndex))

    }

    const login=()=>{
        const google_auth_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(google_auth_provider)
    }


    const happy = ['??????','??????','??????',] // ??????????????????

    const randomRamen = ()=>{
        let random = carts2[Math.floor(Math.random() * carts2.length )]
        let random2 = happy[Math.floor(Math.random() * happy.length )]

        setRandom(`?????????????????????????????????????????????????????????${random.name}???!! ????????????????????????????????????${random2}???`)
    }



    return(
        <React.Fragment>
            {
                user === null ? 
                <h2 className={classes.text}><u className={classes.u}>???????????????????????????</u></h2>:
                <div className={classes.text}>
                    <h2><u className={classes.u}>{user.displayName}????????????????????????????????????</u></h2>
                    <span><img src={user.photoURL}></img></span>
                </div>
                
            }
           
            {carts.length === 0 ? <h2>???????????????????????????????????????</h2> :
            <div className={classes.text}>
               

                <table className={classes.tableWidth}>
                    <thead>
                        <tr className={classes.cartTitle}>
                            <th>
                                <h2>?????????</h2>
                            </th>
                            <th>
                                <h2>??????????????????</h2>
                            </th>
                            <th>
                                <h2>?????????</h2>
                            </th>
                            <th>
                                <h2>??????</h2>
                            </th>
                            <th>
                                <h2>???????????????</h2>
                            </th>
                            <th>
                                <h2>??????(??????)</h2>
                            </th>
                            <th>
                                <h2></h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        carts2.map( (ailias,index)=>{
                            return (
                            <tr key={ailias.id} className={classes.tableBody}>
                                <td>{ailias.name}</td>
                                <td><img src={ailias.pic} className={classes.pic}></img></td>
                                <td>{ailias.size}</td>
                                <td>{ailias.number}</td>
                                <td>{ailias.topping}</td>
                                <td>{ailias.total}</td>
                                <td><button onClick={ ()=>{remove(index)} } className={classes.button}>??????</button></td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>


                <div>????????????{ totalTax() }???</div>
                <div className={classes.price}><u className={classes.u}>????????????????????????{ sumTotalPlice() }???(??????)</u></div>
                <div>
                    <button onClick={ ()=>{randomRamen()} }???className={classes.button}>??????????????????????????????????????????????????????</button>
                    <h3>{randomramen}</h3>
                </div>
                
                <div>
                    {
                        user === null ? 
                        <button onClick={ ()=>{login()} } className={classes.button}>????????????????????????</button>:
                        <button onClick={ ()=>{ handleLink('/order')} } className={classes.button}>??????????????????</button>
                    }
                </div>
            
            </div>
            }
</React.Fragment>
    )
}