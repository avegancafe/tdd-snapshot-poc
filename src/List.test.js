import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adaptor from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";

import List from "./List";
import { ListItem } from "./ListItem";

configure({ adapter: new Adaptor() });

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

const arr = [1, 5, -3, 4, -2];

describe("List", () => {
  describe("when given a list of numbers", () => {
    let list;

    beforeEach(() => {
      list = shallow(<List arr={arr} />);
    });

    it("create corresponding list items", () => {
      expect(list.find(ListItem).length).toBe(arr.length);
      expect(list).toMatchSnapshot();
    });
  });

  describe("when clicking button", () => {
    let list;

    beforeEach(() => {
      list = shallow(<List arr={arr} />);
      let items = list.find(ListItem);
      expect(items.length).toBe(5);
      expect(list).toMatchSnapshot();

      list.find("button").simulate("click");

    });

    it("only shows positive numbers", () => {
      let items = list.find(ListItem);

      expect(items.length).toBe(3);

      items.map(item => {
        expect(item.prop("value") > 0).toBe(true);
      });
      expect(list).toMatchSnapshot();
    });
  });
});
