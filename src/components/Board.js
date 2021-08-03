import React from 'react'
import _ from 'lodash'
import Card from './Card'
import { useSelector } from 'react-redux'

const Board = ({cardsOnTable, takenCards, selectedCards}) => {
    let cardComponents = cardsOnTable.map(card => {
        let selected = selectedCards.some(c=>{return _.isEqual(c,card)}) // выделенные карты
        let taken = takenCards.some(c=>{return _.isEqual(c,card)}) // карты под сброс

        return (
            <Card key={JSON.stringify(card)}
            card={card} selected={selected} taken={taken}>
            </Card>
        )
    })

    return(
        <div id="container">
            <div id="board">
                {cardComponents}
            </div>
            <button id='start_game'>Начать игру</button>
        </div>
    )
}

export default Board