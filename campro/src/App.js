import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Home from './components/Home/Home/Home';
import Search from './components/Home/Search/Search';
import Register from './components/Authentication/Register/Register';
import Login from './components/Authentication/Login/Login';
import Explore from './components/Explore/Explore/Explore';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './components/RouteControl/PrivateRoute/PrivateRoute';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/explore'>
              <Explore />
            </Route>
            <PrivateRoute path='/place-order/:id'>
              <PlaceOrder />
            </PrivateRoute>
            <PrivateRoute path='/dashboard'>
              <Dashboard />
            </PrivateRoute>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/search'>
              <Search />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
