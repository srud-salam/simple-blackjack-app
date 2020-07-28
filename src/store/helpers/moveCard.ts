import { Card, DeckState, Deal } from "../deck/types";
import produce from "immer";

export const moveCard = (state: DeckState, dealType: Deal) => {
  const key: number = Math.floor(Math.random() * state.deckCards.length);
  const card: Card = state.deckCards[key];

  if (dealType === Deal.player) {
    return produce(state, (s) => {
      s.deckCards.splice(key, 1);
      s.playerCards = [...s.playerCards, { ...card, hidden: false }];
    });
  }

  if (dealType === Deal.dealer) {
    return produce(state, (s) => {
      s.deckCards.splice(key, 1);
      s.dealerCards = [...s.dealerCards, { ...card, hidden: false }];
    });
  }

  return produce(state, (s) => {
    s.deckCards.splice(key, 1);
    s.dealerCards = [...s.dealerCards, { ...card, hidden: true }];
  });
};
