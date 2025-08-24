import { Switch, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';



import Login from './components/Login';
import Success from "./components/Success";
import './App.css';
import './components/Layout.css';
import ErrorPage from './components/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <div className="content-section">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/main">
            <SideBar />
            <Products />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
      <Footer />
      <LocationDisplay />
    </>
  );
}

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

export default App;
