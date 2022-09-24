import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Book from './components/Book';
import Regsiter from './components/Regsiter';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import ResetPass from './components/ResetPass';
import Admin from './components/Admin';

function App() {
  return (
    <div className="App">
      <Header/>

      <Switch>
        <Route path={'/'} exact component={Home}/>
        <Route path={'/about'} exact component={About}/>
        <Route path={'/book'} exact component={Book}/>
        <Route path={'/registration'} exact component={Regsiter}/>
        <Route path={'/reservations'} exact component={Reservation}/>
        <Route path={'/admin'} exact component={Admin}/>
        <Route path={'/contact-us'} exact component={Contact}/>
        <Route path={'/reset'} exact component={ResetPass}/>
      </Switch>

    </div>
  );
}

export default App;
