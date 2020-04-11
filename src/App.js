import React , { Component } from 'react';
import './App.css';
import BlogRouter from './router/index';
import { Provider } from 'react-redux'
import store from './redux'
class App extends Component {
  render(){
  return (<Provider store={store}>
    <BlogRouter />
  </Provider>
  )
}
}

export default App;



