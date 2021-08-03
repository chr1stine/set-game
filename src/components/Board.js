import React from 'react'
import _ from 'lodash'
import Card from './Card'

const Board = ({cardsOnTable, takenCards, selectedCards, extraCards, hint}) => {
    let cardComponents = cardsOnTable.map(card => {
        let selected = selectedCards.some(c=>{return _.isEqual(c,card)}) // выделенные карты
        let taken = takenCards.some(c=>{return _.isEqual(c,card)}) // карты под сброс
        let hinted = _.includes(hint,card);

        return (
            <Card hinted={hinted} key={JSON.stringify(card)}
            card={card} selected={selected} taken={taken}>
            </Card>
        )
    })

    return(
        <div id="board" className={`extra_${extraCards}`}>
            {cardComponents}
        </div>
    )
}

export default Board