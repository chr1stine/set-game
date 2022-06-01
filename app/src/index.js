import './style.less';
import { render } from 'react-dom';
import React from 'react';
import App from './components/App';
import Rules from './components/Rules';
import store from './redux/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

render(
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Provider store={store}>
            <App />
          </Provider>
        }></Route>
      <Route path="/rules" element={<Rules />}></Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);
