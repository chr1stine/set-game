import { isEqual } from 'lodash'
import {isValidSet,rules} from './game/rules'
import {Deck} from './game/deck'

let intitalState = { 
    selectedCards: [],
    takenCards: [],
    collectedSet: false,
    validSet: false,
    cardsFinished: false,
    gameFinished: false,
    gameStarted: false,
    extraCards: 0,
    cardsInitialized: false,
    hint: null,
    setCount: 0,
    hintCount: 0,
    timeStart: null,
    timeEnd: null,
    deck: null,
    rules: rules
}

function reducer(state = intitalState,action){
    // выложены карты
    if (action.type === 'cards/initialized'){
        state.cardsInitialized = true;
    }

    // игра началась, генерируем колоду, засекаем время
    if (action.type === 'game/started'){
        state.gameStarted = true;
        state.deck = new Deck();
        state.timeStart = action.payload.getTime();
        console.log(`game sarted at ${state.timeStart}`)
    }

    // выделена карта
    if (action.type === 'card/select'){
        let card = action.payload
        state.selectedCards = [...state.selectedCards, card]

        if (state.selectedCards.length === 3){
            state.collectedSet = true
        }else{
            state.collectedSet = false
        }
    }
    
    // снято выделение с карты
    if (action.type === 'card/deselect'){
        state.collectedSet = false
        state.validSet = false

        let card = action.payload
        state.selectedCards = state.selectedCards.filter(c=>{return !isEqual(c,card)})
    }
    
    // было запрошено 3 дополнительных карты
    if (action.type === 'game/extra'){
        state.extraCards += 3
    }

    // была запрошена подсказка
    if (action.type === 'hint'){
        state.hint = true;
        state.hintCount++;
        let cards = action.payload;
        let found = false;

        outer: for(let i = 0; i < cards.length; i++){
            for (let j = i+1; j < cards.length; j++){
                for (let k = j+1; k < cards.length; k++){
                    let triplet = [cards[i],cards[j],cards[k]]
                    if (isValidSet(triplet)){
                        state.hint = triplet;
                        found = true;
                        break outer;
                    }
                }
            }
        }

        if (!found){
            state.hint = []; // подсказка, что среди выложенных карт нет сета
        }
    }

    // было выделено три карты
    if (action.type === 'set'){
        state.validSet = isValidSet(state.selectedCards)
        
        if (state.validSet){
            console.log(`congrats! valid set`)
            state.takenCards = [...state.selectedCards]
        }else{
            console.log(`sorry, set is incorrect`)
        }

        state.selectedCards = []
        state.collectedSet = false
    }

    // выделенный сет был убран со стола
    if (action.type === 'set/taken'){
        state.takenCards = []
        if (state.extraCards > 0){
            state.extraCards -= 3;
        }
        state.setCount++;
    }

    // карты закончились
    if (action.type === 'cards/finished'){
        state.cardsFinished = true
        console.log(`cards finidhed!`)
    }

    // игра закончилась
    if (action.type === 'game/finished'){
        state.gameFinished = true;
        state.timeEnd = action.payload.getTime();
        console.log(`game finished at ${state.timeEnd}`)
    }
    
    if (action.type === 'game/restart'){
        state = { 
            selectedCards: [],
            takenCards: [],
            collectedSet: false,
            validSet: false,
            cardsFinished: false,
            gameFinished: false,
            gameStarted: false,
            extraCards: 0,
            cardsInitialized: false,
            hint: null,
            setCount: 0,
            hintCount: 0,
            timeStart: null,
            timeEnd: null,
            deck: null,
            rules: rules
        }
    }

    return state
}

export default reducer