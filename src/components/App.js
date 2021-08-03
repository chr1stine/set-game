import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Board from './Board'

const App = ({deck})=>{
    // вытягивает из колоды следующие amount карт
    function pullNewCards(amount){
        let cards = []
        while(deck.cards.length > 0 && cards.length < amount){
            cards.push(deck.cards.pop())
        }

        if (deck.cards.length === 0){
            dispatch({type:'cards/finished'})
        }

        return cards
    }

    function handleStartGame(){
        dispatch({type:'game/started'})
    }

    function handlePullExtraCards(){
        dispatch({type:'game/extra'})
    }

    function handleHint(){
        dispatch({type:'hint',payload:cardsOnTable})
    }

    const dispatch = useDispatch()
    const takenCards = useSelector(state=>state.takenCards) // собранные в сет
    const selectedCards = useSelector(state=>state.selectedCards) // выделенные
    const gameFinished = useSelector(state=>state.gameFinished) // закончена ли игра
    const gameStarted = useSelector(state=>state.gameStarted) // начата ли игра
    const extraCards = useSelector(state=>state.extraCards)
    const cardsInitialized = useSelector(state=>state.cardsInitialized)
    const hint = useSelector(state=>state.hint);
    const cardsFinished = useSelector(state=>state.cardsFinished)
    const [cardsOnTable,setCardsOnTable] = useState([]) // выложенные на стол

    // console.log(`there are ${cardsOnTable.length} cards on table`)

    // первичное выкладывание 12 карт
    if (!cardsInitialized &&
        !gameFinished && 
         gameStarted){
        setCardsOnTable(pullNewCards(12))
        dispatch({type:'cards/initialized'})
    }

    // убирание правильного сета, если собран, и выкладывание новых карт по надобности
    if (takenCards.length > 0){
        let newCards = cardsOnTable.filter(c=>{
            return !_.includes(takenCards,c)
        })

        setCardsOnTable(newCards)

        dispatch({type:'set/taken'})
    }

    if (cardsInitialized && cardsOnTable.length < 12 + extraCards && !cardsFinished){
        setCardsOnTable([...cardsOnTable,...pullNewCards(3)])
    }

    if (gameFinished){
        alert('congrats! you won')
    }

    return (
        <div id="container">
            <Board extraCards={extraCards} cardsOnTable={cardsOnTable} 
                takenCards={takenCards} 
                selectedCards={selectedCards} hint={hint} />

            <button disabled={gameStarted} onClick={handleStartGame} id='start_game'>Начать игру</button>

            <button className={hint?.length == 0 && !cardsFinished ? 'hint' : ''} disabled={extraCards === 6 ||  !gameStarted} onClick={handlePullExtraCards} id='pull_extra_cards'>Выложить три карты</button>

            <button onClick={handleHint}>Подсказка</button>
        </div>
    )

}

export default App