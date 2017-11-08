import React from 'react';
import { connect } from 'react-redux';

// Actions
import { fetchCharPageByEndpoint } from './actions';
// Components
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';

export class CharPage extends React.Component {


  componentDidMount() {
    this.props.fetchCharPageByEndpoint(this.props.match.params.endpoint);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.endpoint !== nextProps.match.params.endpoint) {
      this.props.fetchCharPageByEndpoint(nextProps.match.params.endpoint);
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
          <Navigation fieldsets={this.props.fields} />
          <Content charSheet={this.props.fields}/>
        </div>
      </div>
    )
  }
  // Char Page Container
}

function mapStateToProps(state) {
  console.log('this is the state', state);
  return {
    fields: state.charPage.charSheet.fields,
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

