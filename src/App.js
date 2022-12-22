import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './modules/home/HomePage';
import AboutPage from './modules/home/AboutPage';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/" component={HomePage} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;
