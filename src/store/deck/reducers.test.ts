import { store } from "../../store";
import { GameState, DeckActionTypes, Card, ActionType, Deal } from "./types";
import { getTotalScore } from "../helpers/getTotalScore";

describe("Deck Reducers", () => {
  it("starts a new deck", () => {
    // Arrange
    const drawDeckAction: DeckActionTypes = {
      type: ActionType.DRAW_DECK,
      gameState: GameState.initStart,
    };

    // Act
    store.dispatch(drawDeckAction);
    const deckCards: Card[] = store.getState().deck.deckCards;
    const dealerCards: Card[] = store.getState().deck.dealerCards;
    const playerHand: Card[] = store.getState().deck.playerCards;

    // Assert
    expect(deckCards).toHaveLength(48);
    expect(dealerCards).toHaveLength(2);
    expect(playerHand).toHaveLength(2);
  });

  it("draw a new card from the deck", () => {
    // Arrange
    const drawCardAction: DeckActionTypes = {
      type: ActionType.DRAW_CARD,
      dealType: Deal.player,
    };
    const numberOfCardsOnDeck = store.getState().deck.deckCards.length;
    const numberOfCardsOnPlayerHand = store.getState().deck.playerCards.length;
    const numberOfCardsOnDealerHand = store.getState().deck.dealerCards.length;

    // Act
    store.dispatch(drawCardAction);
    const newDeckCards: Card[] = store.getState().deck.deckCards;
    const newPlayerCards: Card[] = store.getState().deck.playerCards;
    const newDealerCards: Card[] = store.getState().deck.dealerCards;

    // Assert
    expect(newDeckCards).toHaveLength(numberOfCardsOnDeck - 1); // card more to player
    expect(newPlayerCards).toHaveLength(numberOfCardsOnPlayerHand + 1); // a new card added to player hand
    expect(newDealerCards).toHaveLength(numberOfCardsOnDealerHand); // no change made to dealer hand
  });

  it("calculate the total score for aces", () => {
    // Arrange
    const aces: Card[] = [
      { value: "A", suit: "spades", hidden: false },
      { value: "A", suit: "diamonds", hidden: false },
      { value: "A", suit: "clubs", hidden: false },
      { value: "A", suit: "hearts", hidden: false },
    ];

    // Act
    const totalScore: number = getTotalScore(aces);

    // Assert
    expect(aces).toHaveLength(4);
    expect(totalScore).toBe(14);
  });

  it("calculate the total score for A, K, J", () => {
    // Arrange
    const aces: Card[] = [
      { value: "A", suit: "diamonds", hidden: false },
      { value: "K", suit: "clubs", hidden: false },
      { value: "J", suit: "hearts", hidden: false },
    ];

    // Act
    const totalScore: number = getTotalScore(aces);

    // Assert
    expect(aces).toHaveLength(3);
    expect(totalScore).toBe(21);
  });

  it("reavel hidden card from the deck", () => {
    // Arrange
    const reavelHiddenCardAction: DeckActionTypes = {
      type: ActionType.REVEAL_HIDDEN_CARD,
      hidden: false,
    };

    const drawDeckAction: DeckActionTypes = {
      type: ActionType.DRAW_DECK,
      gameState: GameState.initStart,
    };

    store.dispatch(drawDeckAction);

    const dealerHandBefore: Card[] = store
      .getState()
      .deck.dealerCards.filter((c) => c.hidden === true);

    // Act
    store.dispatch(reavelHiddenCardAction);
    const dealerHandAfter: Card[] = store
      .getState()
      .deck.deckCards.filter((c) => c.hidden === true);

    // Assert
    expect(dealerHandBefore).toHaveLength(1);
    expect(dealerHandAfter).toHaveLength(0);
  });
});
