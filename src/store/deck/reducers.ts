import { Card, DeckState, DeckActionTypes, ActionType, Deal } from "./types";
import jsonData from "./deck.json";
import produce from "immer";

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
      const newDeck = produce(initialState, (s) => {
        moveCard(s, Deal.player);
        moveCard(s, Deal.hidden);
        moveCard(s, Deal.player);
        moveCard(s, Deal.dealer);
      });
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

      return produce(state, (s: DeckState) => {
        s.dealerScore = getTotalScore(state.dealerCards);
      });

    case ActionType.REVEAL_HIDDEN_CARD:
      return produce(state, (s: DeckState) => {
        const dealerCards = s.dealerCards.filter((card: Card) => {
          if (card.hidden) card.hidden = false;
          return card;
        });

        s.dealerCards = [...dealerCards];
      });

    default:
      return state;
  }
};

const moveCard = (state: DeckState, dealType: Deal) => {
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

const getTotalScore = (cards: Card[]) => {
  let totalScore: number = 0;

  const aces = cards.filter((card) => {
    if (card.value === "K" || card.value === "Q" || card.value === "J") {
      totalScore += 10;
      return false;
    }

    if (Number.isInteger(+card.value)) {
      totalScore += +card.value;
      return false;
    }

    return card.value === "A";
  });

  aces.forEach((card: Card) => {
    if (card.hidden === false) {
      if (totalScore + 11 > 21) {
        totalScore += 1;
      } else if (totalScore + 11 === 21) {
        if (aces.length > 1) {
          totalScore += 1;
        } else {
          totalScore += 11;
        }
      } else {
        totalScore += 11;
      }
    }
  });

  return totalScore;
};
