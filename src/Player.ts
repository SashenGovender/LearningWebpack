import { Card, CardFaceValue, CardSuit } from "../src/Card";

export class Player {

    private cards: Card[];

    // ---------------------------------------------------------------------------------------------------------------

    constructor() {
        this.cards = [];
    }

    // ---------------------------------------------------------------------------------------------------------------

    public AddCard(card: Card): void {
        this.cards.push(card);
    }

    // ---------------------------------------------------------------------------------------------------------------

    public Score(): number {
        let score: number = 0;
        let hasAce11: boolean = false;

        for (const card of this.cards) {
            let cardValue: number = card.Value;
            if ((card.FaceValue === CardFaceValue.Ace) && (score + 11 <= 21)) {
                cardValue = 11;
                hasAce11 = true;
            }

            score += cardValue;
            if ((score > 21) && hasAce11) {
                score -= 10;
                hasAce11 = false;
            }
        }
        return score;
    }

    // ---------------------------------------------------------------------------------------------------------------

    public ConsoleCards(showAllCards: boolean = true): void {
        if (showAllCards === false) {
            console.log(`${CardFaceValue[this.cards[0].FaceValue]} ${CardSuit[this.cards[0].CardSuit]} `);
            console.log(`Score: ${this.cards[0].Value} `);
            return;
        }

        for (const card of this.cards) {
            console.log(`${CardFaceValue[card.FaceValue]} ${CardSuit[card.CardSuit]} `);
        }
        console.log(`Score: ${this.Score()} `);
    }
    // ---------------------------------------------------------------------------------------------------------------

}
