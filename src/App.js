import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './auth/Login';
import Account from './pages/Account';
import Transactions from './pages/Transactions';
import Bank from './pages/Bank';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path='/' component={Home} ></Route>
        <Route exact path='/login' component={Login} ></Route>
        <Route exact path='/account' component={Account} ></Route>
        <Route exact path='/transactions' component={Transactions} ></Route>
        <Route exact path='/banker' component={Bank} ></Route>
      </Switch>

    </div>
  );
}

export default App;
