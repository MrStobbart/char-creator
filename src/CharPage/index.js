import React from 'react';
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';

export class CharPage extends React.Component{
  
  constructor() {
    super();
    this.state = {
      sheetFieldsets: [],
      sheet: []
    }
    
  }
  
  componentDidMount() {
    this.loadsheet();
    console.log(this.state);
  }
  
  loadsheet() {
    // TODO add proper url handling
    fetch('http://localhost:8080/api/thedarkeye/mundanchar')
    .then(res => res.json())
      .then(sheet => {
        console.log('sheet', sheet);
        this.setState({
          sheetFieldsets: sheet.map(fieldset => {
            return { id: fieldset.id, title: fieldset.title }
          }),
          sheet: sheet
        })
      })
      .catch(err => console.log(err));
    }
    
    render() {
      return (
        <div className="ink-grid">
        <div className="column-group gutters">
          <Navigation fieldsets={this.state.sheetFieldsets} />
          <Content sheet={this.state.sheet} />
        </div>
      </div>
    )
  }
}
