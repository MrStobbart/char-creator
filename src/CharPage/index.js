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

  render() {
    const style = { marginTop: '12px' };
    return (
      <div uk-grid="true" style={style}>
        <div className="uk-width-1-6">
          <Navigation fieldsets={this.props.charSheet.fieldsets} />
        </div>
        <div className="uk-width-2-3">
          <Content charSheet={this.props.charSheet} />
        </div>
      </div>
    )
  }
}


/**
 * CharPageContainer
 */
export const CharPageContainer = connect(mapStateToProps, mapDispatchToProps)(CharPage)

function mapStateToProps(state) {
  console.log('this is the state', state);
  return {
    charSheet: state.charPage.charSheet ? state.charPage.charSheet : {},
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchCharPageByEndpoint: (endpoint) => {
      dispatch(fetchCharPageByEndpoint(endpoint))
    }
  }
}

