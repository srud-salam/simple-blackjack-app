import React from "react";
import styles from "../styles/Card.module.css";

type CardProps = {
  value: string;
  suit: string;
  hidden: boolean;
};

const Card: React.FC<CardProps> = (props) => {
  const { value, suit, hidden } = props;
  const getCardSuit = () => {
    switch (suit) {
      case "spades":
        return "♠";
      case "diamonds":
        return "♦";
      case "clubs":
        return "♣";
      case "hearts":
        return "♥";
    }
  };

  if (hidden) {
    return <div className={styles.hiddenCard} />;
  }
  return (
    <div className={styles.card}>
      <div
        className={
          suit === "spades" || suit === "clubs" ? styles.black : styles.red
        }
      >
        <h1 className={styles.value}>{value}</h1>
        <h1 className={styles.suit}>{getCardSuit()}</h1>
      </div>
    </div>
  );
};

export default Card;
