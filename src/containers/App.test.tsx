import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

import App from "./App";
import { store } from "../store";
import { Provider } from "react-redux";
import Hand from "../components/Hand";

const rendered = shallow(
  <Provider store={store}>
    <App />
  </Provider>
);

describe("<App />", () => {
  it("renders two <Controls /> components", () => {
    expect(rendered.find("Controls")).to.have.length(1);
  });

  it("renders two <Hand /> components", () => {
    console.log("Test Render: ", rendered);

    expect(
      rendered.find(
        <Hand
          title="palyer hand"
          cards={[{ value: "A", suit: "spades", hidden: false }]}
        />
      )
    ).to.have.length(2);
  });
});
