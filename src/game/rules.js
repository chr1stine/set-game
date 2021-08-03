function set_by_color(cards){
    let same = cards[0].color == cards[1].color && cards[1].color == cards[2].color
    let different = cards[0].color!=cards[1].color && cards[1].color != cards[2].color && cards[0].color != cards[2].color
    return same || different
}

function set_by_shape(cards){
    let same = cards[0].shape == cards[1].shape && cards[1].shape == cards[2].shape
    let different = cards[0].shape!=cards[1].shape && cards[1].shape != cards[2].shape && cards[0].shape != cards[2].shape
    return same || different
}

function set_by_shading(cards){
    let same = cards[0].shading == cards[1].shading && cards[1].shading == cards[2].shading
    let different = cards[0].shading!=cards[1].shading && cards[1].shading != cards[2].shading && cards[0].shading != cards[2].shading
    return same || different
}

function set_by_amount(cards){
    let same = cards[0].amount == cards[1].amount && cards[1].amount == cards[2].amount
    let different = cards[0].amount!=cards[1].amount && cards[1].amount != cards[2].amount && cards[0].amount != cards[2].amount
    return same || different
}

function isValidSet(cards){
    return  set_by_color(cards)&&
    set_by_shape(cards)&&
    set_by_shading(cards)&&
    set_by_amount(cards)
}

module.exports = isValidSet