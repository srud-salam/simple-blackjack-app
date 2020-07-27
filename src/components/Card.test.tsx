import React from "react";
import { shallow } from "enzyme";
import Card from "./Card";

describe("<Card />", () => {
  it("shows a cards value", () => {
    const rendered = shallow(<Card value="A" suit="clubs" hidden={false} />);
    rendered.should.have.text("A");
  });
});
