export enum ActionType {
  DRAW_DECK,
  DRAW_CARD,
  CALCULATE_SCORE,
  REVEAL_HIDDEN_CARD,
}

export enum GameState {
  initStart,
  playerTurn,
  dealerTurn,
}

export enum Deal {
  player,
  dealer,
  hidden,
}

export interface Card {
  value: string;
  suit: string;
  hidden: boolean;
}

export interface DeckState {
  deckCards: Card[];
  playerCards: Card[];
  dealerCards: Card[];
  playerScore: number;
  dealerScore: number;
}

export type DrawDeckAction = {
  type: ActionType.DRAW_DECK;
  gameState: GameState;
};
export type DrawCardAction = { type: ActionType.DRAW_CARD; dealType: Deal };
export type CalculateScoreAction = {
  type: ActionType.CALCULATE_SCORE;
  dealType: Deal;
};
export type ReavelHiddenCardAction = {
  type: ActionType.REVEAL_HIDDEN_CARD;
  hidden: boolean;
};

export type DeckActionTypes =
  | DrawDeckAction
  | DrawCardAction
  | CalculateScoreAction
  | ReavelHiddenCardAction;
