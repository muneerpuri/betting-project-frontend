import Home from "./pages/Home";
import Navbar from './components/Navbar'
import Bets from "./pages/Bets";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import './style.css'
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";


function App() {
  // const { user } = useContext(AuthContext);


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
        <Route exact path="/"  render={(props) => {
          return (
            <ComponentWithNavbar component={Home} {...props}/>
          );
        }}/>
         
        {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route> */}
        <Route path="/bets" render={(props) => {
          return (
            <ComponentWithNavbar  component={Bets} {...props}/> 
          );
        }}/>
        {/* <Route path="/profile/:username" render={(props) => {
          return (
            user ?  <ComponentWithNavbar  component={Profile} {...props}/> : <Login />
          );
        }}/> */}
      </Switch>
    </Router>
  );
}

export default App;
