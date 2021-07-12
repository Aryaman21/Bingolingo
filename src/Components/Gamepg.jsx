import {React,useEffect,useState} from 'react';
import { Link as RouterLink,useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from "@material-ui/core/Grid";
import ParticlesBg from "particles-bg";
import Button from "@material-ui/core/Button";
// import {Button as Buttons} from 'react-bootstrap/Button';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import db from '../firebase';
import Popup from './Popup';

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const useStyles = makeStyles(theme => ({
    root: {
      height: "100vh"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(2, 0, 1)
    },
    col: {
      border:"3px solid black",
      margin:"3px",minWidth:"28px",
      maxWidth:"90px",
      flexBasis:"auto",
      flexGrow:"1",
      textAlign:"center",
      justifyContent:"center",
      alignItems:"center",
      color:"black",
      '&:hover':{
        color:"red",
        borderColor:"red"
      },
      '&:active':{
        color:"#00ff00",
        borderColor:"#00ff00"
      },
      cursor:"pointer"
    }
  }));

  const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  shuffle(arr);

function Gamepg() {
    const {roomname,roomid} = useParams();
    const [rooomkey,SetRoomkey] = useState(["",""]);
    const [boxval,setBoxval] = useState(0);
    const [Turn,setTurn] = useState(0);
    const [quitcount,setQuitcount] = useState(0);
    const [wlink,setWlink] = useState("");
    const [winupdate,setWinupdate] = useState("");
    const [chkedbox,setChkedbox] = useState(0);
    const [plarray,setPlarray] = useState([1]);
    const classes = useStyles();
    // db.collection('rooms').where('plname[i]','==',x).get().then((snapshot)=>{
    //   snapshot.docs.forEach(doc=>doc.data().boxvalue)
    // })
    var x = roomname;
    var y = roomid;
    const [valarray,setValarray] = useState([]);
    // db.collection('rooms').where('roomkey','==',y).get().then((snapshot)=>{
    //   snapshot.docs.forEach(doc=>{
    //     var t = doc.id;
    //     setValupdate([...valupdate,t])})
    // })
    // function myChangeHandler(event){
    //   if(event.target.name==='boxnumber'){
    //     setBoxval(event.target.value)
    //   }
    // }

    function winCheck(res){
      //row equivalence
      if(valarray[arr[0]-1]===valarray[arr[1]-1] && valarray[arr[1]-1]===valarray[arr[2]-1] 
        && valarray[arr[2]-1]===valarray[arr[3]-1] && valarray[arr[3]-1]===valarray[arr[4]-1] && valarray[arr[0]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[5]-1]===valarray[arr[6]-1] && valarray[arr[6]-1]===valarray[arr[7]-1] 
        && valarray[arr[7]-1]===valarray[arr[8]-1] && valarray[arr[8]-1]===valarray[arr[9]-1] && valarray[arr[5]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[10]-1]===valarray[arr[11]-1] && valarray[arr[11]-1]===valarray[arr[12]-1] 
        && valarray[arr[12]-1]===valarray[arr[13]-1] && valarray[arr[13]-1]===valarray[arr[14]-1] && valarray[arr[10]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[15]-1]===valarray[arr[16]-1] && valarray[arr[16]-1]===valarray[arr[17]-1] 
        && valarray[arr[17]-1]===valarray[arr[18]-1] && valarray[arr[18]-1]===valarray[arr[19]-1] && valarray[arr[15]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[20]-1]===valarray[arr[21]-1] && valarray[arr[21]-1]===valarray[arr[22]-1] 
        && valarray[arr[22]-1]===valarray[arr[23]-1] && valarray[arr[23]-1]===valarray[arr[24]-1] && valarray[arr[20]-1]==="yellow"){
          res+=1;
      }
      //column equilavence
      if(valarray[arr[0]-1]===valarray[arr[5]-1] && valarray[arr[5]-1]===valarray[arr[10]-1] 
        && valarray[arr[10]-1]===valarray[arr[15]-1] && valarray[arr[15]-1]===valarray[arr[20]-1] && valarray[arr[0]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[1]-1]===valarray[arr[6]-1] && valarray[arr[6]-1]===valarray[arr[11]-1] 
        && valarray[arr[11]-1]===valarray[arr[16]-1] && valarray[arr[16]-1]===valarray[arr[21]-1] && valarray[arr[1]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[2]-1]===valarray[arr[7]-1] && valarray[arr[7]-1]===valarray[arr[12]-1] 
        && valarray[arr[12]-1]===valarray[arr[17]-1] && valarray[arr[17]-1]===valarray[arr[22]-1] && valarray[arr[2]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[3]-1]===valarray[arr[8]-1] && valarray[arr[8]-1]===valarray[arr[13]-1] 
        && valarray[arr[13]-1]===valarray[arr[18]-1] && valarray[arr[18]-1]===valarray[arr[23]-1] && valarray[arr[3]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[4]-1]===valarray[arr[9]-1] && valarray[arr[9]-1]===valarray[arr[14]-1] 
        && valarray[arr[14]-1]===valarray[arr[19]-1] && valarray[arr[19]-1]===valarray[arr[24]-1] && valarray[arr[4]-1]==="yellow"){
          res+=1;
      }
      // diagonal equivalence
      if(valarray[arr[0]-1]===valarray[arr[6]-1] && valarray[arr[6]-1]===valarray[arr[12]-1] 
        && valarray[arr[12]-1]===valarray[arr[18]-1] && valarray[arr[18]-1]===valarray[arr[24]-1] && valarray[arr[0]-1]==="yellow"){
          res+=1;
      }
      if(valarray[arr[4]-1]===valarray[arr[8]-1] && valarray[arr[8]-1]===valarray[arr[12]-1] 
        && valarray[arr[12]-1]===valarray[arr[16]-1] && valarray[arr[16]-1]===valarray[arr[20]-1] && valarray[arr[4]-1]==="yellow"){
          res+=1;
      }
      return res;
    }

    useEffect(()=>{
      db.collection('rooms').where('roomkey','==',y).get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>
          setValarray(doc.data().boxvalue))
      })
      db.collection('rooms').where('roomkey','==',y).get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>
          (
          setTurn(doc.data().turn),
          setChkedbox(doc.data().chkdbox),
          setWinupdate(doc.data().winner),
          setWlink(doc.data().winnwerlink),
          setQuitcount(doc.data().quitcnt)
          ))
      })
    })

    useEffect(()=>{
      let res = winCheck(0);
      if(res>=5){
        db.collection('rooms').doc(rooomkey[1]).update({
          winner:roomname,
          winnerlink:`/gamepg/${roomname}/${roomid}`
        })
        setWinupdate(roomname);
        setWlink(`/gamepg/${roomname}/${roomid}`);
      }
    },[chkedbox])

    window.onbeforeunload = function() {
      return "Data will be lost if you leave the page, are you sure?";
    };

    const onSubmit = (event) =>{
      const ar = valarray;
      const t = plarray.length;
      ar[boxval-1] = "yellow";
      event.preventDefault();
      db.collection('rooms').doc(rooomkey[1]).update({
        boxvalue:ar,
        turn:(Turn+1)%t,
        chkdbox:boxval
      })
      //setTurn((Turn+1)%t);
    }
    useEffect(()=>{
      db.collection('rooms').where('roomkey','==',y).get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>
          (setValarray(doc.data().boxvalue),
          setTurn(doc.data().turn),
          SetRoomkey([doc.data().roomkey,doc.id]),
          setPlarray(doc.data().plname),
          setChkedbox(doc.data().chkdbox))
          )
      })
    },[])


    const onQuit = () =>{
      let index = plarray.indexOf(roomname);
      if (index !== -1) {
        plarray.splice(index, 1);
      }
      if(Turn>0){
        Turn = Turn-1
      }
      db.collection('rooms').doc(rooomkey[1]).update({
        plname:plarray,
        quitcnt:quitcount+1,
        turn: Turn
      })
      setPlarray([...plarray])
      setQuitcount(quitcount+1)
    }

    if(plarray.length === 0 && rooomkey[1]!==""){
      db.collection('rooms').doc(rooomkey[1]).delete()
    }

    useEffect(()=>{
      db.collection('rooms').where('roomkey','==',y).get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>
          (
          setPlarray(doc.data().plname)
          ))
      })
    },[quitcount])

    
    return (
        <div>
        {rooomkey[0] === "" ? <h1>Page Not Found</h1>:<div>
        <Grid item xs={false} sm={12} md={12}>
            <ParticlesBg num={200} type="circle" bg={true}/>
        </Grid>
        <div className="container" style={{display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center",height:"9vh",color:"white"}}>
            <h1 style={{fontStyle:"italic",fontWeight:"bolder"}}>BingoLingo</h1>
        </div>
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"white",height:"91vh",flexDirection:"column"}}>
        <div style={{display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center",margin:"5px",flexDirection:"column"}}>   
        <div className="col">
            <div style={{display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center",margin:"5px",backgroundColor:"lightgray",color:"red",fontStyle:"italic"}}><h3>{`Name : `}<span style={{color:"blue"}}>{x}</span>
            {x===plarray[Turn] ? <span style={{color:"green",fontSize:"22px"}}> (Your Turn)</span>:""}</h3></div>
            <div style={{display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center",margin:"20px",flexDirection:"row"}}><h5 style={{color:"blue",fontStyle:"italic"}}><span style={{color:"red"}}>Recent Action : </span>{`${plarray[(plarray.length+Turn-1)%plarray.length]} `} <span style={{color:"mediumturquoise"}}>selected</span> {chkedbox} <br></br>
            <span style={{color:"red"}}>Current Turn : </span>{`${plarray[Turn]}`}</h5></div>
                <div className="row" style={{textAlign:"center",alignItems:"center",justifyContent:"center",margin:"40px 0px"}}>
                <div style={{padding:"0px 3px",maxWidth:"50%",display:"flex",flexDirection:"row"}}>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[0]-1]}} onClick={()=>setBoxval(arr[0])}><b>{arr[0]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[1]-1]}} onClick={()=>setBoxval(arr[1])}><b>{arr[1]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[2]-1]}} onClick={()=>setBoxval(arr[2])}><b>{arr[2]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[3]-1]}} onClick={()=>setBoxval(arr[3])}><b>{arr[3]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[4]-1]}} onClick={()=>setBoxval(arr[4])}><b>{arr[4]}</b></div></div>
                    <div></div>
                    <div style={{padding:"0px 3px",maxWidth:"50%",display:"flex",flexDirection:"row"}}>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[5]-1]}} onClick={()=>setBoxval(arr[5])}><b>{arr[5]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[6]-1]}} onClick={()=>setBoxval(arr[6])}><b>{arr[6]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[7]-1]}} onClick={()=>setBoxval(arr[7])}><b>{arr[7]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[8]-1]}} onClick={()=>setBoxval(arr[8])}><b>{arr[8]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[9]-1]}} onClick={()=>setBoxval(arr[9])}><b>{arr[9]}</b></div></div>
                    <div></div>
                    <div style={{padding:"0px 3px",maxWidth:"50%",display:"flex",flexDirection:"row"}}>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[10]-1]}} onClick={()=>setBoxval(arr[10])}><b>{arr[10]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[11]-1]}} onClick={()=>setBoxval(arr[11])}><b>{arr[11]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[12]-1]}} onClick={()=>setBoxval(arr[12])}><b>{arr[12]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[13]-1]}} onClick={()=>setBoxval(arr[13])}><b>{arr[13]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[14]-1]}} onClick={()=>setBoxval(arr[14])}><b>{arr[14]}</b></div></div>
                    <div></div>
                    <div style={{padding:"0px 3px",maxWidth:"50%",display:"flex",flexDirection:"row"}}>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[15]-1]}} onClick={()=>setBoxval(arr[15])}><b>{arr[15]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[16]-1]}} onClick={()=>setBoxval(arr[16])}><b>{arr[16]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[17]-1]}} onClick={()=>setBoxval(arr[17])}><b>{arr[17]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[18]-1]}} onClick={()=>setBoxval(arr[18])}><b>{arr[18]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[19]-1]}} onClick={()=>setBoxval(arr[19])}><b>{arr[19]}</b></div></div>
                    <div></div>
                    <div style={{padding:"0px 3px",maxWidth:"50%",display:"flex",flexDirection:"row"}}>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[20]-1]}} onClick={()=>setBoxval(arr[20])}><b>{arr[20]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[21]-1]}} onClick={()=>setBoxval(arr[21])}><b>{arr[21]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[22]-1]}} onClick={()=>setBoxval(arr[22])}><b>{arr[22]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[23]-1]}} onClick={()=>setBoxval(arr[23])}><b>{arr[23]}</b></div>
                    <div className={classes.col} style={{backgroundColor:valarray[arr[24]-1]}} onClick={()=>setBoxval(arr[24])}><b>{arr[24]}</b></div></div>
                </div>
                <div style={{display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center",margin:"5px",flexDirection:"column"}}>
                <TextField
                    variant="filled"
                    margin="normal"
                    type="number"
                    value={boxval}
                    required
                    fullWidth
                    //onChange={myChangeHandler}
                    InputProps={{
                      readOnly: true,
                    }}
                    id="outlined-read-only-inpu"
                    label="Box Number"
                    name="boxnumber"
                    autoComplete="off"
                    autoFocus
                />
                <Button
                    type="submit"
                    disabled={x===plarray[Turn] ? false:true}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    style={{backgroundColor:x===plarray[Turn] ? "green":"red",color:"white"}}
                    className={classes.submit}
                >{x===plarray[Turn] ? "Submit":"It's not your turn"}</Button>
                <Button variant="contained" onClick = {onQuit} component={RouterLink} to={`/`} style={{backgroundColor:"khaki",color:"black",fontWeight:"bold",width:"100%",paddingTop:"3.5px",paddingBottom:"3.5px"}}>
                    Quit
                </Button>
                </div>
            </div>
            </div> 
        </div>
        {winupdate!=="" && winupdate===roomname ? <Popup
          content={<>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <SentimentVerySatisfiedIcon fontSize="large" style={{color:"#33cc33",cursor:"pointer",width:"50px",height:"50px"}} />
            <span>Congratulations !!</span>
            </div>
            <h3 style={{textAlign:"center",fontStyle:"italic",margin:"10px 0px"}}><span style={{color:"#3399ff",fontWeight:"bolder",fontStyle:"italic"}}>YOU</span>{` won the match!!`}</h3>
            <Button variant="contained" onClick = {onQuit} component={RouterLink} target="_blank" to={`/`} style={{backgroundColor:"#00ffcc",color:"black",fontSize:"17px",width:"100%",paddingTop:"3.5px",paddingBottom:"3.5px",fontStyle:"italic"}}>
                    Home Page
                </Button>
          </>}
          handleClose={()=>setWinupdate("")}
        />
        :""}

        {winupdate!=="" && winupdate!==roomname ? <Popup
          content={<>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <SentimentVeryDissatisfiedIcon fontSize="large" style={{color:"ff471a",cursor:"pointer",width:"50px",height:"50px"}} />
            <span>Better luck next time</span>
            </div>
            <h3 style={{textAlign:"center",fontStyle:"italic",margin:"10px 0px"}}><span style={{color:"#3399ff",fontWeight:"bolder",fontStyle:"italic"}}>{winupdate}</span>{` won the match!!`}</h3>
            <Button variant="contained" onClick = {onQuit} component={RouterLink} target="_blank" to={`/`} style={{backgroundColor:"#00ffcc",color:"black",fontSize:"17px",width:"100%",paddingTop:"3.5px",paddingBottom:"3.5px",fontStyle:"italic"}}>
                    Home Page
                </Button>
          </>}
          handleClose={()=>setWinupdate("")}
        />
        :""}

        </div>
    }
    </div>
    )
}

export default Gamepg
