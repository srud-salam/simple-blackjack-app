import React from "react";
import { shallow } from "enzyme";
import Controls from "./Controls";

describe("<Controls />", () => {
  it("the game has buttons for each player action", () => {
    // Arrange
    const hit = jest.fn();
    const stick = jest.fn();
    const reset = jest.fn();
    const buttonState = {
      hitDisabled: false,
      stickDisabled: false,
      resetDisabled: false,
    };
    const component = shallow(
      <Controls
        buttonState={buttonState}
        hitEvent={hit}
        stickEvent={stick}
        resetEvent={reset}
      />
    );

    // Act
    const wrapper = component.find("button");
    wrapper.at(0).simulate("click");
    wrapper.at(1).simulate("click");
    wrapper.at(2).simulate("click");

    // Assert
    expect(hit).toHaveBeenCalled();
    expect(stick).toHaveBeenCalled();
    expect(reset).toHaveBeenCalled();
  });
});
