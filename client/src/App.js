import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [state, setState] = useState({
    loggedIn: false
  });
  const isLoggedIn = () => setState({ ...state, loggedIn: true });
  const isLoggedOut = () => setState({ ...state, loggedIn: false });

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute
          path="/bubbles"
          component={BubblePage}
          onenter={isLoggedIn}
          onexit={isLoggedOut}
        />
      </Switch>
    </div>
  );
}

export default App;
