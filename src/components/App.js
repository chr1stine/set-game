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
            dispatch({type:'game/finished'})
        }

        return cards
    }

    const dispatch = useDispatch()
    const takenCards = useSelector(state=>state.takenCards) // собранные в сет
    const selectedCards = useSelector(state=>state.selectedCards) // выделенные
    const gameFinished = useSelector(state=>state.gameFinished) // закончена ли игра
    const [cardsOnTable,setCardsOnTable] = useState([]) // выложенные на стол

    if (cardsOnTable.length === 0 && !gameFinished){
        setCardsOnTable(pullNewCards(12))
    }

    
    if (takenCards.length > 0){
        let newCards = cardsOnTable.filter(c=>{
            return !_.includes(takenCards,c)
        })
        setCardsOnTable([...newCards,...pullNewCards(3)])

        dispatch({type:'set/taken'})
    }

    return (
        <Board cardsOnTable={cardsOnTable} 
        takenCards={takenCards} 
        selectedCards={selectedCards} />
    )

}

export default App