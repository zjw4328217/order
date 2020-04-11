import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import collapsedReducer from './reducers/collapsedReducer'
import reduxThunk from 'redux-thunk'
import reduxPromsie from 'redux-promise'
import orderInfo from './reducers/orderInfo'
import stateList from './reducers/stateList'
import oneDataList from './reducers/oneDataList'
import orderBuild from './reducers/orderBuild'
const reducer=combineReducers({
    isCollapsed:collapsedReducer,
    orderInfo:orderInfo,
    stateList:stateList,
    oneDataList:oneDataList,
    orderBuild:orderBuild
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware(reduxThunk,reduxPromsie)))

export default store