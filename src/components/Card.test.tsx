import React from "react";
import { shallow } from "enzyme";
import Card from "./Card";

describe("<Card />", () => {
  it("shows a cards value", () => {
    // Arrange
    const component = shallow(<Card value="A" suit="clubs" hidden={false} />);

    // Act
    const wrapper = component.text();

    // Assert
    expect(wrapper).toEqual("A♣");
  });

  it("hide a cards value", () => {
    // Arrange
    const component = shallow(<Card value="A" suit="clubs" hidden={true} />);

    // Act
    const wrapper = component.find(".hiddenCard");

    // Assert
    expect(wrapper).toHaveLength(1);
  });
});
