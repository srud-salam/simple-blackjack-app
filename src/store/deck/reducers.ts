import { Card, DeckState, DeckActionTypes, ActionType, Deal } from "./types";
import jsonData from "./deck.json";
import produce from "immer";
import { getTotalScore } from "../helpers/getTotalScore";
import { moveCard } from "../helpers/moveCard";

const initialState: DeckState = {
  deckCards: JSON.parse(JSON.stringify(jsonData.cards)),
  playerCards: [] as Card[],
  dealerCards: [] as Card[],
  playerScore: 0,
  dealerScore: 0,
};

export const deckReducer = (
  state: DeckState = initialState,
  action: DeckActionTypes
): DeckState => {
  switch (action.type) {
    case ActionType.DRAW_DECK:
      const newState = initialState;
      let newDeck = moveCard(newState, Deal.player);
      newDeck = moveCard(newDeck, Deal.hidden);
      newDeck = moveCard(newDeck, Deal.player);
      newDeck = moveCard(newDeck, Deal.dealer);
      return newDeck;

    case ActionType.DRAW_CARD:
      if (state.deckCards.length > 0) {
        return moveCard(state, action.dealType);
      }

      alert("All cards have been drawn");
      return state;

    case ActionType.CALCULATE_SCORE:
      if (action.dealType === Deal.player) {
        return produce(state, (s: DeckState) => {
          s.playerScore = getTotalScore(state.playerCards);
        });
      }

      if (action.dealType === Deal.dealer) {
        return produce(state, (s: DeckState) => {
          s.dealerScore = getTotalScore(state.dealerCards);
        });
      }
      return state;

    case ActionType.REVEAL_HIDDEN_CARD:
      return produce(state, (s: DeckState) => {
        const dealerCards = s.dealerCards.filter((card: Card) => {
          if (card.hidden) card.hidden = action.hidden;
          return card;
        });

        s.dealerCards = [...dealerCards];
      });

    default:
      return state;
  }
};
