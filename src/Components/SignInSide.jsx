import React, {useState} from "react";
import { Redirect, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import HouseIcon from '@material-ui/icons/House';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ParticlesBg from "particles-bg";
import db from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';



const MadeWithLove = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Built with love by "}
    <Link color="inherit" href="/">
      Aryaman Singh
    </Link>
  </Typography>
);

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    margin: theme.spacing(2,4),
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


const SignInSide = () => {
  const history = useHistory();
  const num = Math.floor(Math.random() * 1000001);
  const classes = useStyles();
  const[path,setPath] = useState("/");
  const[btntxt,setBtntxt] = useState("Create");
  const[hide,setHide] = useState(false);
  const[btnclr,setBtnclr] = useState("navy");
  const[btnType,setBtnType] = useState("none");
  const[room,setRoom] = useState(['','',num.toString()]);

  const showPassword = (e) => {
    setBtnclr("green");
    setBtntxt("Submit");
    setBtnType("submit");
    setHide(e.target.checked);
    
  }

  function myChangeHandler(event){
    if(event.target.name==='name'){
      setRoom([event.target.value,room[1],room[2]]);
    }
    else if(event.target.name==='roomname'){
      setRoom([room[0],event.target.value,room[2]]);
    }
  }

  function mySubmitHandler(event){
    if(btnclr==="navy"){
      alert(`Check the box and copy room key before submitting.`);
    }
    else{
      event.preventDefault();
      db.collection('rooms').add({
        boxvalue: ["white","white","white","white","white","white","white","white","white",
        "white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white"],
        plname: [room[0]],
        roomkey: room[2],
        roomname: room[1],
        turn:0,
        chkdbox:0,
        readystate:0,
        readystart:1,
        winner:"",
        winnerlink:"",
        quitcnt:0,
        exitcnt:0
      })
      alert(`Room created with id:- ${room[2]} `);
      setRoom(['','','']);
      setPath("/lobbypg/"+room[0]+"/"+room[2]);
    }
  }
  if(path!=="/"){ 
    history.push(path);
    //return <Redirect to={path}/>;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
      <ParticlesBg num={200} type="circle" bg={true}/>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <div className="container" style={{display:"flex",backgroundColor: "#282c34",alignItems:"center",textAlign:"center",justifyContent:"center",height:"9vh",color:"white",padding:"0px 20px"}}>
            <h1 style={{fontStyle:"italic",fontWeight:"bolder"}}>BingoLingo</h1>
        </div>  
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HouseIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Room
          </Typography>
          <form className={classes.form} onSubmit={mySubmitHandler}>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="name"
              value={room[0]}
              label="Your Name"
              name="name"
              onChange={myChangeHandler}
              autoComplete="off"
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              value={room[1]}
              id="email"
              label="Room Name"
              name="roomname"
              onChange={myChangeHandler}
              autoComplete="off"
              autoFocus
            />
            {hide ? <div>
            <TextField
              id = "outlined-read-only-input"
              variant="filled"
              margin="normal"
              fullWidth
              name="password"
              label="Room key"
              type="text"
              InputProps={{
                readOnly: true,
              }}
              id="password"
              value={room[2]}
              autoComplete="off"
            />
            <Grid container>
              <Grid item>
                <span href="/signup" variant="body2">
                  {"Copy this Key and share with your friends."}
                </span>
              </Grid>
            </Grid></div>:null}
            <FormControlLabel
              control={<Checkbox value="remember" onClick={showPassword} color="primary" />}
              label="Show Room Key"
            />
            <Button
              type={btnType}
              fullWidth
              variant="contained"
              color="primary"
              //component={Link} to={`/lobbypg/${room[0]}/${room[2]}`}
              style={{backgroundColor:btnclr}}
              className={classes.submit}
            >
              {btntxt} 
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  <span style={{fontSize:"17px"}}>{"Join room ??"}</span>
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
