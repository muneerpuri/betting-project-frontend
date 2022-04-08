import Home from "./pages/Home";
import Navbar from './components/Navbar'
import Bets from "./pages/Bets";
import MakeBet from "./pages/MakeBet";
import NotFound from './pages/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import './style.css'
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";


function App() {
  // const { user } = useContext(AuthContext);

  const { addToast } = useToasts();

  function ComponentWithNavbar(props){
    return(
      <>
      <Navbar />
      <props.component/>
  
      </>
    )
  }


  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => {
          return (
            <ComponentWithNavbar component={Home} {...props}/>
          );
        }}/>
         
        {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route> */}
        <Route path="/bets" exact render={(props) => {
          let user = localStorage.getItem("userId");
          if(user) {
            return <ComponentWithNavbar  component={Bets} {...props}/> 
          }else{
            addToast("Please make a bet!", { appearance: "error" });
           return <Redirect to="/" />
          }
        }}/>
        <Route path="/makebet/:id" exact render={(props) => {
           let user = localStorage.getItem("userId");
           if(user) {
          return  <ComponentWithNavbar  component={MakeBet} {...props}/> 
        }else{
         return <Redirect to="/" />
        }
        }}/>
        {/* <Route path="/profile/:username" render={(props) => {
          return (
            user ?  <ComponentWithNavbar  component={Profile} {...props}/> : <Login />
          );
        }}/> */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
