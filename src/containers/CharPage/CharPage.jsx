import React from 'react';
import { CharPageNav } from '../../components/CharPageNav/CharPageNav';
import { CharPageContent } from '../../components/CharPageContent/CharPageContent';

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
    fetch('http://localhost:8080/api/thedarkeye/mundanchar')
      .then(res => res.json())
      .then(sheet => {
        console.log('sheet', sheet);
        this.setState({
          sheetFieldsets: sheet.map(field => {
            return { name: field.name, title: field.title }
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
          <CharPageNav fieldsets={this.state.sheetFieldsets} />
          <CharPageContent sheet={this.state.sheet} />
        </div>
      </div>
    )
  }
}