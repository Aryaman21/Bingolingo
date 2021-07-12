import {React,useEffect,useState} from 'react';
import { Redirect, useParams } from 'react-router-dom'
import '../App.css';
import db from '../firebase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red, green, purple } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const Theme = createMuiTheme({ palette: { primary: green, secondary: red} })

const useStyles = makeStyles(theme => ({
    mydiv: {
      padding:"3px",
      overflowY:"auto",
      height:"225px"
    },
    appbar: {
      alignItems: 'center',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(7),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
    },
  }));

function Lobbypg() {
    const history = useHistory();
    const {roomname,roomid} = useParams();
    const[plarr,setPlarr] = useState([]);
    const[id,setId] = useState("");
    const[roomnm,setRoomnm] = useState("");
    const[btnclr,setBtnclr] = useState("primary")
    const[btntxt,setBtntxt] = useState("Ready")
    const[rdystate,setRdystate] = useState(0)
    const[roomID,setRoomID] = useState("")

    function readyFunc(){
        const i = plarr.indexOf(roomname);
        var t = rdystate;
        if(btnclr==="primary"){
            setBtnclr("secondary")
            //arr[i] = "green";
            t = rdystate+1;
        }
        else{
            setBtnclr("primary")
            t = rdystate-1;
            //arr[i] = "black";
        }
        db.collection('rooms').doc(roomID).update({
          //readyclr:arr,
          readystate:t
        })
        if(btntxt==="Ready"){
            setBtntxt("Not Ready")
        }
        else{
            setBtntxt("Ready")
        }
    }

    const onQuit = () =>{
      let index = plarr.indexOf(roomname);
      let t = rdystate;
      if (index !== -1) {
        plarr.splice(index, 1);
      }
      if(btnclr==="secondary"){
        t = t-1;
      }
      db.collection('rooms').doc(id).update({
        plname:plarr,
        readystate:t
      })
      setPlarr([...plarr])
    }


    useEffect(()=>{
        db.collection('rooms').where('roomkey','==',roomid).get().then((snapshot)=>{
          snapshot.docs.forEach(doc=>(
            setId(doc.id),
            setPlarr(doc.data().plname),
            setRdystate(doc.data().readystate)
          ))
        })
      })


    useEffect(()=>{
        db.collection('rooms').where('roomkey','==',roomid).get().then((snapshot)=>{
          snapshot.docs.forEach(doc=>(
            setRoomnm(doc.data().roomname),
            setPlarr(doc.data().plname),
            setRoomID(doc.id)
          ))
        })
      },[])

    // useEffect(()=>{
    //   },[btnclr])
    
    if(rdystate>1 && rdystate===plarr.length){
        let path = `/gamepg/${roomname}/${roomid}`; 
        history.push(path);
        //window.location.assign(`/gamepg/${roomname}/${roomid}`);
        //return <Redirect to = {`/gamepg/${roomname}/${roomid}`}/>
    }

    return (
        <div className="App">
        <div className="container" style={{display:"flex",backgroundColor: "#282c34",alignItems:"center",textAlign:"center",justifyContent:"center",height:"9vh",color:"white",border:"2px solid white"}}>
            <h1 style={{fontStyle:"italic",fontWeight:"bolder"}}>BingoLingo</h1>
        </div>
            <header className="App-header" style={{minHeight:"91vh"}}>
                <h2 style={{marginBottom:"20px",fontStyle:"italic",fontWeight:"bolder"}}>Welcome to the game of Bingo</h2>
                <h4 style={{fontStyle:"italic",fontWeight:"bold",color:'#cccc00'}}>Waiting Hall</h4>
                <h3>Room Name : <span style={{color:"orchid"}}>{roomnm}</span></h3>
                <div style={{display:"flex", alignItems:"center",justifyContent:"center",margin:"20px 0px 10px 0px"}}>
                    <Container className={useStyles.cardGrid} maxWidth="md">
                    <Grid container spacing={2} alignItems="center" justify="center">
                        <Grid item xs={12} sm={12} md={12}>
                        <div style={{backgroundColor:"white",border:"3px solid white",padding:"1px",borderRadius:"8px"}} className={useStyles.card}>
                            <div  style={{ display:"flex",justifyContent:"center",color:"white", alignItems:"center", background:'#cccc00' }} position="static">
                                <Toolbar>
                                <Typography  variant="h6" color="inherit" noWrap>
                                    <b style={{textAlign:"center"}}>Players List</b>
                                </Typography>
                                </Toolbar>
                            </div>
                            <div id="style-scroll" style={{display:"flex",flexDirection:"column",overflow:"auto",height:"200px"}}>
                                <CardContent className={useStyles.cardContent}>
                                <div className={useStyles.mydiv}>
                                    {plarr.map((pnames) => (
                                        <h6 style={{cursor:"pointer",color:"black",textAlign:"center"}} >{pnames}<hr></hr></h6>
                                    ))}
                                </div>
                                </CardContent>
                            </div>
                        </div>
                        </Grid>
                    </Grid>
                    </Container>  
                </div>
                <small style={{fontSize:"15px",color:'#cccc00',fontStyle:"italic"}}>Match will automatically start when all the players are ready</small>
                <div style={{display:"flex",flexDirection:"row", marginTop:"10px"}}>
                <MuiThemeProvider theme={Theme}>
                    <Button color={btnclr} variant="contained" onClick={readyFunc}>
                        {btntxt}
                    </Button>
                </MuiThemeProvider>
                
                <Button variant="contained" onClick={onQuit} component={RouterLink} to={`/`} style={{marginLeft:"20px",backgroundColor:"khaki",color:"black",fontWeight:"bold"}}>
                    Quit
                </Button>
                </div>
                
            </header>
        </div>
    )
}

export default Lobbypg
