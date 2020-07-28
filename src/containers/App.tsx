import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Hand from "../components/Hand";
import Controls from "../components/Controls";
import Status from '../components/Status';
import {RootState} from "../store";
import {DeckState, Deal} from "../store/deck/types";
import {drawDeckAction, drawCardAction, calculateScoreAction, reavelHiddenCardAction} from "../store/deck/actions";

const App: React.FC = () => {
	
  const deck = useSelector<RootState, DeckState>(state => state.deck);
  const dispatch = useDispatch();
  
  enum GameState {
    initStart,
    playerTurn,
    dealerTurn,
  }

  enum Message {
    hitStick = "Hit or Sick?",
    bust = "Bust!",
    playerWin = "You Win!",
    dealerWin = "Dealer Wins!",
    tie = "Tie!",
  }

  const [gameState, setGameState] = useState(GameState.initStart);
  const [playerCount, setPlayerCount] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);
  const [message, setMessage] = useState(Message.hitStick);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    stickDisabled: false,
    resetDisabled: true,
  });

  useEffect(() => {
    if (gameState === GameState.initStart) {
	  dispatch(drawDeckAction(GameState.initStart));
      setGameState(GameState.playerTurn);
      setMessage(Message.hitStick);
    }
  }, [gameState]);

  useEffect(() => {
	dispatch(calculateScoreAction(Deal.player));
    setPlayerCount(playerCount + 1);
  }, [deck.playerCards]);

  useEffect(() => {
	dispatch(calculateScoreAction(Deal.dealer));
    setDealerCount(dealerCount + 1);
  }, [deck.dealerCards]);

   useEffect(() => {
    if (gameState === GameState.playerTurn) {
      if (deck.playerScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      }
      else if (deck.playerScore > 21) {
        bust();
      }
    }
  }, [playerCount]);
  
  useEffect(() => {
    if (gameState === GameState.dealerTurn) {
      if (deck.dealerScore >= 17) {
        checkWin();
      }
      else {
       dispatch(drawCardAction(Deal.dealer));	
      }
    }
  }, [dealerCount]);
  
   const resetGame = () => {
    console.clear();
	dispatch(drawDeckAction(GameState.initStart));
	
    setPlayerCount(0);
    setDealerCount(0);

    setGameState(GameState.initStart);
    setMessage(Message.hitStick);
    setButtonState({
      hitDisabled: false,
	  stickDisabled: false,
      resetDisabled: true
    });
  }
 
  const hit = () => {
	console.log("hit: ");
	dispatch(drawCardAction(Deal.player));
  }
  
   const stick = () => {
	console.log("stick: ");
    buttonState.hitDisabled = true;
    buttonState.stickDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.dealerTurn);
	dispatch(reavelHiddenCardAction(false));
  }

  const bust = () => {
	console.log("bust: ");
    buttonState.hitDisabled = true;
    buttonState.stickDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setMessage(Message.bust);
  }

  const checkWin = () => {
    if (deck.playerScore > deck.dealerScore || deck.dealerScore > 21) {
      setMessage(Message.playerWin);
    }
    else if (deck.dealerScore > deck.playerScore) {
      setMessage(Message.dealerWin);
    }
    else {
      setMessage(Message.tie);
    }
  }

   return (
    <div>
      <Status message={message} />
      <Hand title={`Dealer's Hand (${deck.dealerScore})`} cards={deck.dealerCards} />
      <Hand title={`Your Hand (${deck.playerScore})`} cards={deck.playerCards} />
	  <Controls
        buttonState={buttonState}
        hitEvent={hit}
        stickEvent={stick}
        resetEvent={resetGame}
      />
    </div>
  );
};

export default App;
