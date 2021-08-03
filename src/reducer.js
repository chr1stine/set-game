import { isEqual } from 'lodash'
import isValidSet from './game/rules'

let intitalState = { 
    selectedCards: [],
    takenCards: [],
    collectedSet: false,
    validSet: false,
    gameFinished: false
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
    }

    if (action.type === 'game/finished'){
        state.gameFinished = true
    }
    
    return state
}

export default reducer