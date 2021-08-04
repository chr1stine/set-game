import React from 'react'
import { useDispatch } from 'react-redux'


const Card = (props)=>{
    const dispatch = useDispatch()

    function handleCardClick(e){
        let type = props.selected ? 'deselect' : 'select'
        dispatch({type:`card/${type}`,payload:props.card})
    }

    // отрисовка содержимого карты
    let shapes = new Array(props.card.amount)
    for (let i=1;i<=props.card.amount;i++){
        shapes.push(
                <div key={`${props.card.shape} ${props.card.amount}_${i} ${props.card.shading} ${props.card.color}`} className={`shape ${props.card.shape} ${props.card.color}`}>
                    <div className={`border_ ${props.card.shape} ${props.card.color} ${props.card.shading}`}></div>
                </div>
        )
    }

    let classString = `card__clickable${props.selected ? ' selected':''}${props.incorrect ? ' wrong':''}${props.correct ? ' correct':''}`
    classString += `${props.hinted?' hinted':''}`
    return(
        <div onClick={handleCardClick} 
        className={`card_ ${props.taken? 'taken':''}`}>
            <div className={classString}></div>

            <div key={`${props.card.amount} 
            ${props.card.color} 
            ${props.card.shading} 
            ${props.card.shape}`} 
            className={`card__content`}>
                {shapes}
            </div>
        </div>
    )
}

export default Card