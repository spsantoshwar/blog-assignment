import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, Switch, BrowserRouter as Routes } from 'react-router-dom';
import { indexRoute } from './routes';
import "./assets/css/main.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routes>
      <Switch>
        {
          indexRoute && indexRoute.map((props, key) => {
            return (
              <Route path={props.path} component={props.component} key={key} />
            )

          })
        }
      </Switch>
    </Routes>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
