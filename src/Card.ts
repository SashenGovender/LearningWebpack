export enum CardSuit {
    Hearts,
    Diamonds,
    Spades,
    Clubs,
}

export enum CardFaceValue {
    Ace = 1,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
}

export class Card {

    private suit: CardSuit;
    private faceValue: CardFaceValue;
    private value: number;
    constructor(suit: CardSuit, faceValue: CardFaceValue, value: number) {
        this.suit = suit;
        this.faceValue = faceValue;
        this.value = value;
    }
    get Value() {
        return this.value;
    }
    get FaceValue() {
        return this.faceValue;
    }
    get CardSuit() {
        return this.suit;
    }
}
