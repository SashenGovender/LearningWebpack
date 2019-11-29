import { Card } from "../src/Card";
import { Deck } from "../src/Deck";
import { Player } from "../src/Player";

export class Blackjack {
  private decks: Deck[];
  private dealer: Player;
  private players: Player[] = [];

  // ---------------------------------------------------------------------------------------------------------------

  constructor(decks: Deck[]) {
    this.decks = decks;
    this.dealer = new Player();
    this.players = [];
  }

  // ---------------------------------------------------------------------------------------------------------------

  public PlayGame(numOfPlayers: number): void {
    // Initialise our players
    for (let i: number = 0; i < numOfPlayers; i++) {
      this.players.push(new Player());
    }

    // Time to deal two cards each to the players and the dealer
    this.Deal();
    this.DisplayMessage(`Player Cards`);
    this.DisplayMessage(`--------------------------------------------`);
    for (const player of this.players) {
      this.DisplayCards(player);
    }

    this.DisplayMessage(`\nDealer Cards`);
    this.DisplayMessage(`--------------------------------------------`);
    this.DisplayCards(this.dealer, false);
    this.DisplayMessage(`\n********************************************\n`);

    // Ask the players if they would like to receives any more cards
    this.Hit();

    this.DisplayMessage(`\n********************************************\n`);
    // If the players are all burst, dealer wins and live goes on
    if (this.HasPlayersGoneBurst()) {
      this.DisplayMessage(`Dealer Wins against All players`);
      return;
    }

    this.DisplayMessage(`\n********************************************\n`);
    // Lets deal some cards to the dealer
    this.DealToDealer();
    this.DisplayMessage(`\nDealer Cards after Hit`);
    this.DisplayMessage(`---------------------`);
    this.DisplayCards(this.dealer);

    // Check if any1 has won
    this.DisplayMessage(`\n`);
    this.EvaluateHands();
  }

  // ---------------------------------------------------------------------------------------------------------------

  private DealToDealer() {
    while (this.dealer.Score() <= 17) {
      this.dealer.AddCard(this.GetCard());
    }
  }

  // ---------------------------------------------------------------------------------------------------------------

  private Deal(): void {
    for (const player of this.players) {
      player.AddCard(this.GetCard());
      player.AddCard(this.GetCard());
    }

    this.dealer.AddCard(this.GetCard());
    this.dealer.AddCard(this.GetCard());
  }

  // ---------------------------------------------------------------------------------------------------------------

  private Hit(): void {
    for (let playerIndex: number = 0; playerIndex < this.players.length; playerIndex++) {
      // alert(`Player ${playerIndex} turn`);
      this.DisplayMessage(`Player ${playerIndex} turn`);

      let playerInput: number = this.UserInput(`Please input 1 to Hit or 0 to Proceed`);

      while (playerInput === 1 && this.players[playerIndex].Score() < 21) {
        this.players[playerIndex].AddCard(this.GetCard());
        this.DisplayMessage(`Players after Hit Cards`);
        this.DisplayMessage(`-------------------------`);
        this.DisplayCards(this.players[playerIndex]);

        if (this.players[playerIndex].Score() < 21) {
          playerInput = this.UserInput(`Please input 1 to Hit or 0 to Proceed`);
        }
      }
    }
  }

  // ---------------------------------------------------------------------------------------------------------------

  private GetCard(): Card {
    const card: Card | null = this.decks[0].getCard();
    if (card == null) {
      throw new Error("No more cards");
    }
    return card;
  }

  // ---------------------------------------------------------------------------------------------------------------

  private DisplayCards(playerHand: Player, showAllCards: boolean = true): void {
    playerHand.ConsoleCards(showAllCards);
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Check if all the players have gone burst
  private HasPlayersGoneBurst(): boolean {
    for (const playerIndex in this.players) {
      if (this.players[playerIndex].Score() <= 21) {
        return false;
      }
    }
    return true;
  }

  // ---------------------------------------------------------------------------------------------------------------

  private EvaluateHands() {
    for (const playerIndex in this.players) {
      if (this.players[playerIndex].Score() > 21) {
        this.DisplayMessage(`Dealer Wins against burst player ${playerIndex}`);
      } else if (this.dealer.Score() > 21) {
        this.DisplayMessage(`Player ${playerIndex} Wins against burst dealer `);
      } else if (this.players[playerIndex].Score() > this.dealer.Score()) {
        this.DisplayMessage(`Player ${playerIndex} Wins against dealer `);
      } else if (this.players[playerIndex].Score() < this.dealer.Score()) {
        this.DisplayMessage(`Player ${playerIndex} Loses against dealer `);
      } else if (this.players[playerIndex].Score() === this.dealer.Score()) {
        this.DisplayMessage(`Player ${playerIndex} draws against dealer `);
      }
    }
  }

  // ---------------------------------------------------------------------------------------------------------------

  private DisplayMessage(message: string): void {
    // tslint:disable-next-line: no-console
    console.log(message);
  }

  // ---------------------------------------------------------------------------------------------------------------

  private UserInput(message: string): number {
    const input: string | null = prompt(`Please input 1 to Deal or 0 to Proceed`);
    if (input) {
      const choice = parseInt(input, 10);
      return choice;
    }
    return 0;
  }
}
