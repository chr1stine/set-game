import './style.less'
import {render} from 'react-dom'
import React from 'react'
import App from './components/App'
import {Deck} from './game/deck'
import reducer from './reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

// инициализация хранилища
const store = createStore(reducer)

// опопвещение, что собран сет
store.subscribe(()=>{
    let state = store.getState()
    if (state.collectedSet){
        store.dispatch({type:'set'})
    }
})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)