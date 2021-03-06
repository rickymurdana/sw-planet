
import './App.css';
import PlanetList from './components/PlanetList';
import PlanetDetail from './components/PlanetDetail'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={PlanetList} exact />
        <Route path="/:id" component={PlanetDetail} exact />
          />
        </Switch>
    </Router>
  );
}

export default App;
