import {React,useEffect,useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import db from '../firebase';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by "}
      <Link color="inherit" href="/signup">
        Aryaman Singh
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const[path,setPath] = useState("/")
  const[pname,setPname] = useState("");
  const[plarr,setPlarr] = useState([]);
  const[plstate,setPlstate] = useState(0);
  const[rkey,setRkey] = useState("");
  const[exist,setExist] = useState("");

  function myChangeHandler(event){
    if(event.target.name==='name'){
      setPname(event.target.value);
    }
    else if(event.target.name==='password'){
      setRkey(event.target.value);
    }
  }

  useEffect(()=>{
    db.collection('rooms').where('roomkey','==',rkey).get().then((snapshot)=>{
      snapshot.docs.forEach(doc=>(
        setExist(doc.id),
        setPlarr(doc.data().plname),
        setPlstate(doc.data().readystart)
        ))
    })
  },[rkey])
  
  const onSubmit = (event) =>{
    plarr.push(pname);
    if(exist!=="" && plstate<5){
      db.collection('rooms').doc(exist).update({
        plname:plarr,
        readystart:plstate+1
      });
      setPlstate(plstate+1);
      setPath("/lobbypg/"+pname+"/"+rkey);
      event.preventDefault();
    }
    else if(plstate>5){
      alert(`Room limit reached..`);
    }
    else{
      alert(`No Such Room Exist's..`);
    }
  }
  if(path!=="/"){
    history.push(path);
    //return <Redirect to={path}/>;
  }
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <Container style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} component="main" maxWidth="xs">
      <CssBaseline />
      <div className="container" style={{display:"flex",backgroundColor: "#282c34",alignItems:"center",textAlign:"center",justifyContent:"center",height:"9vh",color:"white",padding:"0px 20px"}}>
            <h1 style={{fontStyle:"italic",fontWeight:"bolder"}}>BingoLingo</h1>
        </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HomeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Lobby
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="name"
                value = {pname}
                onChange={myChangeHandler}
                label="Your Name"
                name="name"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                value = {rkey}
                onChange={myChangeHandler}
                label="Room Key"
                type="text"
                id="password"
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{backgroundColor:"green"}}
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
              <span style={{fontSize:"17px"}}>Create your own Room</span>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
      
    </Container>
    </div>
  );
}
