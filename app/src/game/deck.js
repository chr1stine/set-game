class Deck {
  constructor() {
    this.initialize();
    this.shuffle();
    // this.reduce(3);
  }

  initialize() {
    this.cards = new Array();
    let colors = ['red', 'green', 'purple'];
    let shapes = ['oval', 'diamond', 'squiggle'];
    let amount = [1, 2, 3];
    let shading = ['striped', 'solid', 'void'];

    amount.forEach((am) => {
      shapes.forEach((shp) => {
        colors.forEach((co) => {
          shading.forEach((shd) => {
            let c = new Card(co, am, shp, shd);
            this.cards.push(c);
          });
        });
      });
    });
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  reduce(n) {
    this.cards = this.cards.splice(0, n);
  }
}

class Card {
  constructor(color, amount, shape, shading) {
    this.color = color;
    this.amount = amount;
    this.shape = shape;
    this.shading = shading;
  }
}

module.exports = { Deck, Card };
