import 'firebase/compat/firestore'
import React,{ useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  useHistory } from 'react-router-dom'
import { addLike } from '../actions/ActionCreator'
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() =>
    createStyles({
        "button": {
            borderColor: "#faa61a",
            color: "#faa61a",
            fontWeight: 600,
            marginBottom: "8px",
            backgroundColor: "#fff",
            padding: "10px",
            "&:hover": {
                backgroundColor: "#faa61a",
                color: "#fff"
            }
        },
        "search": {
            textAlign: "center"
        },
        "card": {
            width: "350px",
            background: "#FFF",
            borderRadius: "5px",
            boxShadow: "0 2px 5px #ccc",
            marginBottom: "40px",
        },
        "card-list": {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            justifyContent: "space-evenly",
            height: "auto",
            width: "auto",
            padding: "5%",

        },
        "card-content": {
            padding: "20px",
            textAlign: "center",
            fontWeight: 700,

        },
        "card-title": {
            fontSize: "20px",
            fontWeight: 700,
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "center"
        },
        "card-picutre": {
            width: "350px",
            height: "200px"

        },
        "text":{
            width:"250px",
            height:"35px",
            marginRight:"15px"            
        },
        "clearButton": {
            borderColor: "#faa61a",
            color: "#faa61a",
            fontWeight: 600,
            // marginBottom: "8px",
            backgroundColor: "#fff",
            padding: "10px",
            marginLeft:"15px",
            "&:hover": {
                backgroundColor: "#faa61a",
                color: "#fff"
            }
        },
        "randombutton": {
            borderColor: "#faa61a",
            color: "#faa61a",
            fontWeight: 600,
            backgroundColor: "#fff",
            padding: "10px",
            "&:hover": {
                backgroundColor: "#faa61a",
                color: "#fff"
            }
        },
        "lucky":{
            backgroundColor:"#ffead6",
            width:"60%",
            paddingTop:"15px",
            paddingBottom:"15px",
            marginLeft:"auto",
            marginRight:"auto",
            marginTop:"50px"
        },
        "likebutton":{
            borderColor: "#faa61a",
            color: "#faa61a",
            fontWeight: 600,
            marginBottom: "8px",
            backgroundColor: "#fff",
            padding: "10px",
            marginLeft:"15px",

            "&:hover": {
                backgroundColor: "#faa61a",
                color: "#fff"
            }
        },
    


    }),
);

const ramenSelector = state => {
    return state.StoreState.ramen
}

const loginSelector = state=>{ 
    return state.StoreState.loginUser
}

export const Home = ()=>{

    const classes = useStyle()

    const history = useHistory()
    const handleLink = path => history.push(path)

    const dispatch = useDispatch()

    const ramenData = useSelector(ramenSelector)

    const user = useSelector(loginSelector)

    const likeAdd = (likeRamen)=>{
        alert('???????????????????????????????????????')
        dispatch(addLike(likeRamen))
    }

    const [ramenlist, setRamen] = useState([]) // State?????????????????????????????????????????????????????????
    
    useEffect(
        ()=>{
            setRamen(ramenData)
        }
    )

    const [word,setWord] = useState('') // ?????????????????????????????????

    const inputText = (e)=>{
        //console.log(e.target.value)
        setWord(e.target.value)
    }

    
    const [findRamenlist, setNewRamen] = useState([]) // default????????????????????????????????????????????????????????????????????????

    // ????????????
    const searchRamen = ()=>{
        let findRamen = ramenlist.filter(ramen => { // fileter?????????????????????????????????????????????????????????????????????
            return ramen.name.match(word) //String.prototype.match() => ?????????????????????????????????????????????
            }
        )

        if(findRamen.length === 0){
            alert('???????????????????????????????????????')
        } else {
            setNewRamen(findRamen)
        }
    }

    const clear = ()=> { // ?????????????????? => ???????????????
        setWord('')
    }

    // ?????????????????????????????????
    const[ randomname, setRandom ] = useState('')
    const[ randompic,setRandom2 ]=useState('')

    const randomRamen=()=>{
        let random=ramenlist[Math.floor(Math.random() * ramenlist.length )]
        setRandom(`?????????????????????  ${random.name}`)
        setRandom2(random.pic)
    }


    // ??????????????????(??????)????????????????????????
    const High = () => {
        const high = ramenlist.sort((a, b) => { // ?????????????????????
            return b.Msizeprice - a.Msizeprice
        })
        const high2 = findRamenlist.sort((a, b) => {
            return b.Msizeprice - a.Msizeprice
        })
        //console.log([...ramenlist,high])
        setRamen([ ...ramenlist, high ])
        setNewRamen(high2)
    }

    // ??????????????????(??????)????????????????????????
    const Low = () => {
        const low = ramenlist.sort((a, b) => {
            return a.Msizeprice - b.Msizeprice
        })
        const low2 = findRamenlist.sort((a, b) => {
            return a.Msizeprice - b.Msizeprice
        })
        setRamen([ ...ramenlist, low ])
        setNewRamen(low2)
    }


    // ??????????????????????????????????????????(ChangeRamen)
    const ChangeRamen = ()=> { // ???????????????????????????????????????????????????????????????
        if(findRamenlist.length === 0){
            return ( // if??????return
                ramenlist.map( 
                    (ramen,index)=>{
                        return (
                            <div key={ramen.id} className={classes.card} >
                                <div className={classes['card-title']} >{ramen.name}</div>
                                <div><img src={ramen.pic} className={classes['card-picutre']} /></div>
                                <div className={classes['card-content']}>
                                    <div>M????????????{ramen.Msizeprice}???</div>
                                    <div>L????????????{ramen.Lsizeprice}???</div>
                                    <div>
                                        <button onClick={ ()=>{handleLink(`/detail/${ramen.id}`)} } className={classes.button} >???????????????</button>
                                        {
                                            user === null ? 
                                            true:  <button onClick={ ()=>{ likeAdd(ramen) } } className={classes.likebutton} >?????????????????????</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
            )
        } else {
            return ( // else???return
                findRamenlist.map(
                    (ramen,index)=> {
                        return (
                            <div key={ramen.id} className={classes.card}>
                                <div className={classes['card-title']}>{ramen.name}</div>
                                <div><img src={ramen.pic} className={classes['card-picutre']} /></div>
                                <div className={classes['card-content']}>
                                    <div>M????????????{ramen.Msizeprice}???</div>
                                    <div>L????????????{ramen.Lsizeprice}???</div>
                                    <div>
                                        <button onClick={ ()=>{handleLink(`/detail/${ramen.id}`)} } className={classes.button} >???????????????</button>
                                        {
                                            user === null ? 
                                            true:  <button onClick={ ()=>{ likeAdd(ramen) } } className={classes.likebutton} >?????????????????????</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
            )
        }
    }
    

    // Home??????????????????????????????JSX
    return (
        <div className={classes.search}>
            <h1>??????????????????</h1>

            <div className={classes.lucky}>
            <button???className={classes.randombutton}??? onClick={ ()=>{randomRamen()}}???>???????????????????????????</button>
            <h2>{randomname}</h2>
            <h2><img src={randompic} alt='' className="pic"???/></h2>
            </div>


            <input type='text' placeholder='??????????????????' value={word} onChange={ (event)=>{ inputText(event) } } className={classes.text} />
            <button onClick={ ()=> { searchRamen() } } className={classes.button} >??????</button>
            <button onClick={ ()=> { clear() } } className={classes.clearButton} >?????????</button>
            <h2>????????????</h2>
            <button className={classes.button} onClick={() => { High() }} >?????????</button>  <button className={classes.button} onClick={() => { Low() }}>?????????</button>
            <div className={classes['card-list']} >{ ChangeRamen() }</div>
        </div>
    )
}


