import { DeckActionTypes, GameState, ActionType, Deal } from "./types";

export const drawDeckAction = (gameState: GameState): DeckActionTypes => ({
  type: ActionType.DRAW_DECK,
  gameState,
});

export const drawCardAction = (dealType: Deal): DeckActionTypes => ({
  type: ActionType.DRAW_CARD,
  dealType,
});

export const calculateScoreAction = (dealType: Deal): DeckActionTypes => ({
  type: ActionType.CALCULATE_SCORE,
  dealType,
});

export const reavelHiddenCardAction = (hidden: boolean): DeckActionTypes => ({
  type: ActionType.REVEAL_HIDDEN_CARD,
  hidden,
});
