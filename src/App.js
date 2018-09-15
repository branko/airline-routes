import React, { Component } from 'react';
import './App.css';
import data from './data.js';
import { getAirlineById, getAirportByCode } from './data.js';
import { Table } from './components/Table.js';
import { Select } from './components/Select.js';
import Map from './components/Map.js'


class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      perPage: 25,
      routes: data.routes,
      airlines: data.airlines,
      airports: data.airports,
      selectedAirline: 'all',
      selectedAirport: 'all',
    }
    this.formatValue = this.formatValue.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  formatValue(property, value) {
    return 'a string';
  }

  nextPage() {
    if ((this.state.page + 1) * this.state.perPage > data.routes.length) { return }
    this.setState(Object.assign(this.state, { page: this.state.page + 1 }))
  }

  prevPage() {
    if (this.state.page === 1) { return }
    this.setState(Object.assign(this.state, { page: this.state.page - 1 }))
  }

  onSelect(e) {
    let selected;

    if (e.target.name === 'airlines') {
      selected = +e.target.value || 'all'
      this.setState(Object.assign(this.state, { selectedAirline: selected }))
    } else {
      selected = e.target.value || 'all'
      this.setState(Object.assign(this.state, { selectedAirport: selected }))
    }

    this.filterAirlines()
    this.filterAirports()
  }

  filterAirlines() {
    var filteredAirlines = data.airlines;
    var filteredRoutes = data.routes;
    var id = this.state.selectedAirline

    if (id !== 'all') {
      filteredAirlines = data.airlines.filter(airline => airline.id === id)
      filteredRoutes = data.routes.filter(route => route.airline === id)
    }

    this.setState(Object.assign(this.state, {
      airlines: filteredAirlines,
      routes: filteredRoutes,
      selectedAirline: id,
    }))
  }

  filterAirports() {
    var airportCode = this.state.selectedAirport
    var filteredRoutes = this.state.routes;;

    if (airportCode !== 'all') {
      filteredRoutes = this.state.routes.filter(route => {
        return route.src === airportCode || route.dest === airportCode
      })
    }

    this.setState(Object.assign(this.state, {
      routes: filteredRoutes,
      selectedAirport: airportCode,
    }))
  }

  clearFilter() {
    this.setState(Object.assign(this.state, {
      selectedAirline: 'all',
      selectedAirport: 'all',
    }))

    this.filterAirlines();
    this.filterAirports();
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const current = (this.state.page - 1) * this.state.perPage
    const currentMax = this.state.page * this.state.perPage
    const filteredAirlines = data.airlines.map(option => {
            return (
              <option
                disabled={this.state.selectedAirline !== 'all' && this.state.selectedAirline !== option.id}
                selected={option.id === this.state.selectedAirline}
                value={option['id']}>{option['name']}
              </option>
              )
          })

    const filteredAirports = data.airports.map(option => {
            return (
              <option
                disabled={this.state.selectedAirport !== 'all' && this.state.selectedAirport !== option.code}
                selected={option.code === this.state.selectedAirport}
                value={option.code}
                >
                {option.name}
              </option>
              )
          })

    const routesInfo = this.state.routes.map(route => {
      const airlineInfo = this.state.airlines.filter(airline => airline.id === route.airline)[0]
      const srcAirport = this.state.airports.filter(airport => airport.code === route.src)[0]
      const destAirport = this.state.airports.filter(airport => airport.code === route.dest)[0]

      return {
        airline: airlineInfo.name,
        srcAirport: srcAirport.name,
        destAirport: destAirport.name,
        y1: srcAirport.lat,
        x1: srcAirport.long,
        y2: destAirport.lat,
        x2: destAirport.long,
      }
    })

    let counter = 0

    const routeCoordinates = routesInfo.map(info => {
      return (
        <g key={"route-" + String(counter++)}>
          <circle className="source" cx={info.x1} cy={info.y1}>
            <title></title>
          </circle>
          <circle className="destination" cx={info.x2} cy={info.y2}>
            <title></title>
          </circle>
          <path d={`M${info.x1} ${info.y1} L ${info.x2} ${info.y2}`} />
        </g>
      )
    })

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <Map
          coordinates={routeCoordinates}
        />
        <section>
          <h3>Showing {current}-{currentMax} of {data.routes.length} routes</h3>
          <button onClick={this.prevPage}>Previous Page</button>
          <button onClick={this.nextPage}>Next Page</button>

          <Select
            options={filteredAirlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={this.state.selectedAirline}
            onSelect={this.onSelect.bind(this)}
            name="airlines"
          />
          <Select
            options={filteredAirports}
            valueKey="id"
            titleKey="name"
            allTitle="All Airports"
            value={this.state.selectedAirport}
            onSelect={this.onSelect.bind(this)}
            name="routes"
          />
          <button onClick={this.clearFilter.bind(this)}>Clear Filter</button>
        
          <Table
            className="routes-table"
            columns={columns}
            rows={this.state.routes}
            format={this.formatValue}
            current={current}
            currentMax={currentMax}
          />
        </section>
      </div>
    );
  }
}

export default App;