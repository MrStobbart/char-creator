import React from 'react';
import Autosuggest from 'react-autosuggest';

export class AutocompleteField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions = (value) => {
    const selectableGroups = this.props.selectableGroups

    if (value === '') {
      return selectableGroups;
    }

    return selectableGroups
      .map(selectableGroup => {
        console.log(selectableGroup)
        return {
          ...selectableGroup,
          selectables: selectableGroup.selectables.filter(selectable => selectable.label.toLowerCase().indexOf(value.toLowerCase()) > -1)
        };
      })
      .filter(selectableGroup => selectableGroup.selectables.length > 0);
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.label;
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.label}</span>
    );
  }

  renderSectionTitle = (selectableGroup) => {
    return (
      <strong>{selectableGroup.label}</strong>
    );
  }

  getSectionSuggestions = (selectableGroup) => {
    return selectableGroup.selectables;
  }

  shouldRenderSuggestions = (value) => {
    return true;
  }

  render() {
    console.log('Autocomplete props', this.props)
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
        inputProps={inputProps}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
      />
    );
  }
}


