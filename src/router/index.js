import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
}from 'react-router-dom'
import Login from '../views/Login/Login'
import Main from '../views/main/Main'
 const BlogROuter =() => (
    <Router>
        <Switch>
            <Route path='/login' component={Login} exact/>
            <Route path='/' render ={() =>(
                sessionStorage.getItem('isLogin')==='true'?
                <Route path='/' component={Main} />:
                <Redirect to='/login' />

            )}
            />
        </Switch>
    </Router>
)

export default BlogROuter