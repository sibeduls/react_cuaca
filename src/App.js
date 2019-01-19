import React, { Component } from 'react';
import {  BrowserRouter,  Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";

import PgLogin  from './pages/pg_login.js';
import PgCuaca from './pages/pg_cuaca.js';
import PgAkhir from './pages/pg_akhir.js';

import DataStoreku  from './globalstore/start_store.js';



class App extends Component {
  render() {
    return (
      <Provider store={ DataStoreku }>
          <header className="masthead">
              <h3 className="masthead-brand">Selamat Datang, di robot cuaca</h3>
            <hr/>
          </header>
          
          <div className="row justify-content-center h-100">
      <BrowserRouter>
        <Switch>
          <Route path='/tanya_cuaca' component={PgCuaca} />          
          <Route path='/thankyou' component={PgAkhir} />          
          <Route path='/' component={PgLogin} />          
        </Switch>
      </BrowserRouter>
          </div>
        
          <footer className="page-footer font-small blue pt-4">
              <div className="footer-copyright text-center py-3">© 2019 Copyright:
                  <a href="https://www.google.com/" target="_blank"
                    rel="noopener noreferrer"
                  > Jimmy.com</a>
                </div>
          </footer>
    
      </Provider>
    );
  }
}

export default App;
