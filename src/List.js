import React, { Component } from "react";
import { ListItem } from "./ListItem";

export default class List extends Component {
  state = {
    showNegative: true
  };
  toggleNegative = () => {
    this.setState(previousState => {
      return {
        ...previousState,
        showNegative: !previousState.showNegative
      };
    });
  };
  get filteredArr() {
    return this.state.showNegative
      ? this.props.arr
      : this.props.arr.filter(el => el > 0);
  }
  render() {
    return (
      <div>
        {this.filteredArr.map((el, i) => (
          <ListItem key={i} value={el} />
        ))}
        <button onClick={this.toggleNegative} />
      </div>
    );
  }
}
