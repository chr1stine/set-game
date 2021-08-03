class Deck {
    constructor(){
        this.cards = new Array()
        let colors = ['red','green','purple']
        let shapes = ['oval','diamond','squiggle']
        let amount = [1,2,3]
        let shading = ['striped','solid','void']

        amount.forEach(am => {
            shapes.forEach(shp => {
                colors.forEach(co => {
                    shading.forEach(shd => {
                        let c = new Card(co,am,shp,shd)
                        this.cards.push(c)
                    })
                })
            })
        })
        // shuffle(this.cards)
    }      
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class Card {
    constructor(color,amount,shape,shading){
        this.color = color
        this.amount = amount
        this.shape = shape
        this.shading = shading
    }
}

module.exports = {Deck,Card}