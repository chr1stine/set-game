import './style.less'
import {render} from 'react-dom'
import React from 'react'
import App from './components/App'
import {Deck} from './game/deck'
import reducer from './reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// генерирование новой колоды
const deck = new Deck()

// инициализация хранилища
const store = createStore(reducer)

store.subscribe(()=>{
    let state = store.getState()
    if (state.collectedSet){
        store.dispatch({type:'set'})
    }
})

render(
    <Provider store={store}>
        <App deck={deck} />
    </Provider>,
    document.getElementById('root')
)