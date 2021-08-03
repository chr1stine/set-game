import { isEqual } from 'lodash'
import isValidSet from './game/rules'

let intitalState = { 
    selectedCards: [],
    takenCards: [],
    collected: false,
    valid: false,
    gameFinished: false
}

function reducer(state = intitalState,action){

    if (action.type === 'card/select'){
        let card = action.payload
        state.selectedCards = [...state.selectedCards, card]

        if (state.selectedCards.length === 3){
            state.collected = true
        }else{
            state.collected = false
        }
    }
    
    if (action.type === 'card/deselect'){
        state.collected = false
        state.valid = false

        let card = action.payload
        state.selectedCards = state.selectedCards.filter(c=>{return !isEqual(c,card)})
    }

    if (action.type === 'set'){
        state.valid = isValidSet(state.selectedCards)
        
        if (state.valid){
            console.log(`congrats! valid set`)
            state.takenCards = [...state.takenCards,...state.selectedCards]
        }else{
            console.log(`sorry, set is incorrect`)
        }

        state.selectedCards = []
        state.collected = false
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