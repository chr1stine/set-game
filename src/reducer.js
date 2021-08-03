import { isEqual } from 'lodash'
import isValidSet from './game/rules'

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
    hint: null
}

function reducer(state = intitalState,action){

    if (action.type === 'card/select'){
        let card = action.payload
        state.selectedCards = [...state.selectedCards, card]

        if (state.selectedCards.length === 3){
            state.collectedSet = true
        }else{
            state.collectedSet = false
        }
    }
    
    if (action.type === 'card/deselect'){
        state.collectedSet = false
        state.validSet = false

        let card = action.payload
        state.selectedCards = state.selectedCards.filter(c=>{return !isEqual(c,card)})
    }

    if (action.type === 'set'){
        state.validSet = isValidSet(state.selectedCards)
        
        if (state.validSet){
            console.log(`congrats! valid set`)
            state.takenCards = [...state.takenCards,...state.selectedCards]
        }else{
            console.log(`sorry, set is incorrect`)
        }

        state.selectedCards = []
        state.collectedSet = false
    }

    if (action.type === 'set/taken'){
        state.takenCards = []
        if (state.extraCards > 0){
            state.extraCards -= 3;
        }
    }

    if (action.type === 'game/started'){
        state.gameStarted = true
    }

    if (action.type === 'cards/finished'){
        state.cardsFinished = true
    }
    
    if (action.type === 'game/extra'){
        state.extraCards += 3
    }

    if (action.type === 'cards/initialized'){
        state.cardsInitialized = true;
    }

    if (action.type === 'hint'){
        state.hint = true;
        let cards = action.payload;
        let found = false;
        // TODO: эффективно искать сет, пока что - жадно
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
            if (state.cardsFinished){
                state.gameFinished = true;
            }
            state.hint = []; // подсказка, что среди выложенных карт нет сета, значит надо выкладывать новые
        }
    }

    console.log(`now extraCards is ${state.extraCards}`)

    return state
}

export default reducer