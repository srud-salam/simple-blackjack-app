import { Card } from "../deck/types";

export const getTotalScore = (cards: Card[]) => {
  let totalScore: number = 0;

  const aces = cards.filter((card) => {
    if (card.hidden === false) {
      if (card.value === "K" || card.value === "Q" || card.value === "J") {
        totalScore += 10;
        return false;
      }

      if (Number.isInteger(+card.value)) {
        totalScore += +card.value;
        return false;
      }
    }
    return card.value === "A" && card.hidden === false;
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
