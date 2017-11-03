import React from 'react';
import { connect } from 'react-redux';

// Actions
import { fetchCharPageByEndpoint } from './actions';
// Components
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';

export class CharPage extends React.Component {


  componentDidMount() {
    if (this.props.charSheet !== undefined) {
      this.props.fetchCharPageByEndpoint('thedarkeye/mundanchar');
    }

  }

  // loadsheet() {
  // fetchEndpoint('thedarkeye/mundanchar')
  //   .then(sheet => {
  //     console.log('sheet', sheet);
  //     this.setState({
  //       sheetFieldsets: sheet.map(fieldset => {
  //         return { id: fieldset.id, title: fieldset.title }
  //       }),
  //       sheet: sheet
  //     })
  //   })
  //   .catch(err => console.log(err));
  // }
  
  render() {
    return (
      <div className="ink-grid">
        <div className="column-group gutters">
          <Navigation fieldsets={this.props.charSheet} />
          <Content charSheet={this.props.charSheet}/>
        </div>
      </div>
    )
  }
}

// Char Page Container
function mapStateToProps(state) {
  console.log('this is the state', state);
  return {
    charSheet: state.charPage.charSheet,
    sheetFieldsets: state.charPage.sheetFieldsets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCharPageByEndpoint: (endpoint) => {
      dispatch(fetchCharPageByEndpoint(endpoint))
    }
  }
}

export const CharPageContainer = connect(mapStateToProps, mapDispatchToProps)(CharPage)

