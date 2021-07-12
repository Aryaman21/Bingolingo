import './App.css';
import SignInSide from "./Components/SignInSide";
import SignUpSide from "./Components/SignUpSide";
import Gamepg from "./Components/Gamepg";
import Lobbypg from './Components/Lobbypg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/" exact component={SignInSide} />
        <Route exact path="/signup" component={SignUpSide} />
        <Route exact path="/lobbypg/:roomname/:roomid" component={Lobbypg} />
        <Route exact path="/gamepg/:roomname/:roomid" component={Gamepg} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
