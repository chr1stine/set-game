import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Board from './Board'

const App = ()=>{
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
        dispatch({type:'game/started',payload:new Date()})
    }

    function handlePullExtraCards(){
        dispatch({type:'game/extra'})
    }

    function handleHint(){
        if (cardsFinished){
            dispatch({type:'game/finished',payload:new Date()})
        }else{
            dispatch({type:'hint',payload:cardsOnTable})
        }
    }

    function computePlayTime(){
        let timeSpent = (timeEnd-timeStart)/1000; // в секундах
        let hh = timeSpent > 3600 ? timeSpent / 3600 : 0;
        timeSpent %= 3600;
        let mm = timeSpent > 60 ? timeSpent / 60 : 0;
        timeSpent %= 60;
        let ss = timeSpent;
        return `${hh != 0 ? `${hh}ч ` : ''+ mm != 0? `${mm}м `:''+`${ss}с`}`;
    }

    function restart(){
        setCardsOnTable([])
        dispatch({type:'game/restart'})
    }

    const dispatch = useDispatch()
    const rules = useSelector(state=>state.rules)
    const deck = useSelector(state=>state.deck);
    const takenCards = useSelector(state=>state.takenCards) // собранные в сет
    const selectedCards = useSelector(state=>state.selectedCards) // выделенные
    const gameFinished = useSelector(state=>state.gameFinished) // закончена ли игра
    const gameStarted = useSelector(state=>state.gameStarted) // начата ли игра
    const extraCards = useSelector(state=>state.extraCards)
    const cardsInitialized = useSelector(state=>state.cardsInitialized)
    const hint = useSelector(state=>state.hint);
    const cardsFinished = useSelector(state=>state.cardsFinished)
    const [cardsOnTable,setCardsOnTable] = useState([]) // выложенные на стол
    const setCount = useSelector(state=>state.setCount);
    const hintCount = useSelector(state=>state.hintCount);
    const timeStart = useSelector(state=>state.timeStart);
    const timeEnd = useSelector(state=>state.timeEnd);

    if (gameStarted && !gameFinished){
        // первичное выкладывание карт
        if (!cardsInitialized){
            setCardsOnTable(pullNewCards(12))
            dispatch({type:'cards/initialized'})
        }else if (!gameFinished){
            // убирание правильного сета, если собран, и выкладывание новых карт по надобности
            if (takenCards.length > 0){
                let newCards = cardsOnTable.filter(c=>{
                    return !_.includes(takenCards,c)
                })

                setCardsOnTable(newCards)

                dispatch({type:'set/taken'})
            }

            // доложить новых карт, если требуется и возможно
            if (cardsOnTable.length < 12 + extraCards && !cardsFinished){
                setCardsOnTable([...cardsOnTable,...pullNewCards(3)])
            }

            if (cardsOnTable.length === 0){
                dispatch({type:'game/finished',payload:new Date()})
            }
        }else{
            // игра окончена
            dispatch({type:'game/finished',payload:new Date()});
        }
    }

    return (
        <div id="container">
            <div id="modal" className={gameFinished ? '':'hidden'}>
                <div className='modal__content'>
                    <h3>Игра пройдена!</h3>
                    <p>{`Счёт: ${setCount}`}</p>
                    <p>{`Подсказок запрошено: ${hintCount}`}</p>
                    <p>{`Времени пройдено: ${timeEnd != null ? computePlayTime():''}`}</p>
                    <button className='btn btn-primary' 
                    onClick={restart}>Ещё раз</button>
                </div>
            </div>
            <div id='sidebar' className={`${gameStarted ? '' : 'hidden'}`}>
                <div id="rules">
                    <h4>Правила</h4>
                </div>
                <h2>Счёт: {setCount}</h2>
                <h2>Подсказок: {hintCount}</h2>
            </div>
            <Board extraCards={extraCards} cardsOnTable={cardsOnTable} 
                takenCards={takenCards} 
                selectedCards={selectedCards} hint={hint} />

            <div id="buttons">
                <button className='btn btn-outline-primary' disabled={gameStarted} onClick={handleStartGame} id='start_game'>Начать игру</button>

                <button className={hint?.length == 0 && !cardsFinished ? 'btn btn-primary' : 'btn btn-outline-primary'} disabled={extraCards === 6 ||  !gameStarted || cardsFinished} onClick={handlePullExtraCards} id='pull_extra_cards'>Выложить три карты</button>

                <button className='btn btn-outline-primary' disabled={!gameStarted} onClick={handleHint}>Подсказка</button>
            </div>
        </div>
    )

}

export default App