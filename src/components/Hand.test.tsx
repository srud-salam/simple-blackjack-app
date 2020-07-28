import React from "react";
import { shallow } from "enzyme";
import Hand from "./Hand";
import { Card } from "../store/deck/types";

describe("<Hand />", () => {
  it("shows a label with card score", () => {
    // Arrange
    const card = { value: "7", suit: "spades", hidden: false } as Card;
    const component = shallow(
      <Hand title={`Dealer's Hand (7)`} cards={[card]} />
    );

    // Act
    const wrapper = component.find(".title").text();

    // Assert
    expect(wrapper).toContain("Dealer's Hand (7)");
  });

  it("shows all the cards in a hand", () => {
    // Arrange
    const clubs = { value: "7", suit: "clubs", hidden: false } as Card;
    const spades = { value: "7", suit: "spades", hidden: false } as Card;
    const hearts = { value: "7", suit: "hearts", hidden: false } as Card;

    const component = shallow(
      <Hand title={`Your Hand (21)`} cards={[clubs, spades, hearts]} />
    );

    // Act
    const wrapper = component.find("Card");

    // Assert
    expect(wrapper).toHaveLength(3);
  });
});
