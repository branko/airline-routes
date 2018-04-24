import React, { Component } from 'react';
import data from '../data.js';
import {getAirlineById, getAirportByCode} from '../data.js'

class Table extends Component {
  render() {
    const rowData = this.props.rows.slice(this.props.current, this.props.currentMax).map((d, i) => {
      return (
        <tr>
          <td>{getAirlineById(d.airline)}
          </td>
          <td>{getAirportByCode(d.src)}
          </td>
          <td>{getAirportByCode(d.dest)}
          </td>
        </tr>
        )
    })

    return (
      <table className={this.props.className}>
        <tbody>
          <tr>
            <th>{this.props.columns[0].name}
            </th>
            <th>{this.props.columns[1].name}
            </th>
            <th>{this.props.columns[2].name}
            </th>
          </tr>
          {rowData}
        </tbody>
      </table>
      )
  }
}


export { Table }