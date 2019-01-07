import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Search from './Pages/Search';
import Provider, { Context } from './Provider/';
import './App.css';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Provider>
          <Switch>
            <Route 
              exact path={ "/" } 
              render={() => (
              <Context.Consumer>
                {context => <Home { ...context } />}
              </Context.Consumer>
              )} 
            />
            <Route 
              exact path={ "/search" } 
              render={() => (
                <Context.Consumer>
                  {context => <Search { ...context } />}
                </Context.Consumer>
              )} 
            />
          </Switch>
        </Provider>
      </div>
    )
  }
}

export default BooksApp
