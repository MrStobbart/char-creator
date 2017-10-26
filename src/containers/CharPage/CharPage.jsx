import React from 'react';
import { CharPageNav } from '../../components/CharPageNav/CharPageNav';

export class CharPage extends React.Component{

  constructor() {
    super();
    this.state = {
      charSheetFields: [],
      charSheet: []
    }
    
  }

  componentDidMount() {
    this.loadCharSheet();
    console.log(this.state);
  }

  loadCharSheet() {
    fetch('http://localhost:8080/api/thedarkeye/mundanchar')
      .then(res => res.json())
      .then(charsheet => {
        console.log('charsheet', charsheet);
        this.setState({
          charSheetFields: charsheet.map(field => {
            return { name: field.name, title: field.title }
          }),
          charSheet: charsheet
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <CharPageNav fields={this.state.charSheetFields}/>
      </div>
    )
  }
}