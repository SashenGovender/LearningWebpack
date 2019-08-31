import { Card, CardFaceValue, CardSuit } from "../src/Card";

export class Deck {
  private cards: Card[];

  // ---------------------------------------------------------------------------------------------------------------

  constructor() {
    this.cards = [];
  }

  // ---------------------------------------------------------------------------------------------------------------

  public getCard(): Card | null {
    // if (this.cards.length > 0) {
    //     const card: Card = this.cards.pop();
    //     return card;
    // }
    // return null;
    const card: Card | undefined = this.cards.pop();
    if (card === undefined) {
      return null;
    } else {
      return card;
    }
  }

  // ---------------------------------------------------------------------------------------------------------------

  public Shuffle(): void {
    for (const card of this.cards) {
      const index1: number = Math.floor(Math.random() * this.cards.length);
      const index2: number = Math.floor(Math.random() * this.cards.length);

      if (index1 !== index2) {
        const temp: Card = this.cards[index1];
        this.cards[index1] = this.cards[index2];
        this.cards[index2] = temp;
      }
    }
  }

  // ------------------------------------------------------------------------------------------------------------------

  public AddCard(card: Card): void {
    this.cards.push(card);
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// tslint:disable-next-line: max-classes-per-file
class StandardDeck extends Deck {
  constructor() {
    super();

    for (let faceValue: CardFaceValue = CardFaceValue.Ace; faceValue <= CardFaceValue.King; faceValue++) {
      for (let suit: CardSuit = CardSuit.Hearts; suit <= CardSuit.Clubs; suit++) {
        let value: number = faceValue;
        if (faceValue >= CardFaceValue.Ten) {
          value = 10;
        }
        this.AddCard(new Card(suit, faceValue, value));
      }
    }
    this.Shuffle();
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export enum DeckType {
  Standard,
}
// tslint:disable-next-line: max-classes-per-file
export class DeckFactory {
  public CreateDeck(deckType: number): Deck {
    switch (deckType) {
      case DeckType.Standard:
        return new StandardDeck();

      default:
        return new StandardDeck();
    }
  }
}
