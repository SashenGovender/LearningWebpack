import { Blackjack } from "../src/Blackjack";
import { Deck, DeckFactory, DeckType } from "../src/Deck";

const numberOfPlayer: number = 1;
const deckFactory: DeckFactory = new DeckFactory();

let playAgain: boolean = false;
do {
    console.clear();
    {
        const deck1: Deck = deckFactory.CreateDeck(DeckType.Standard);
        const decks: Deck[] = [deck1];
        const blackjackGame: Blackjack = new Blackjack(decks);
        blackjackGame.PlayGame(numberOfPlayer);
    }
    playAgain = confirm(`Play Again`);
} while (playAgain === true);
