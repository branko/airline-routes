import React, { Component } from 'react';

class Select extends Component {

  render() {
    var selected = this.props.value;

    return (
      <select name={this.props.name}
      value={this.props.value}
      onChange={this.props.onSelect}>
        <option
          value="all">{this.props.allTitle}
        </option>
        {this.props.options}
      </select>
      )
  }
}

export { Select }