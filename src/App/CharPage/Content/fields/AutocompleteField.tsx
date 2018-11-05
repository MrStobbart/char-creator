import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import './AutocompleteField.css';

export interface AutocompleteFieldProps extends Autosuggest.AutosuggestProps<string>{
  
}

interface State{
  value: string
  suggestions: string[]
}

export class AutocompleteField extends React.Component<AutocompleteFieldProps, State> {
  constructor(props: AutocompleteFieldProps) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  componentDidMount() {

    // Set field value if already in char data 
    if (this.props.selectedField) {
      this.setState(prevState => {
        return {
          ...prevState,
          value: this.props.selectedField.label
        }
      })
    }
  }

  onChange = (event, { newValue, method }) => {
    console.log('newValue', newValue, this.props, this.state)
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

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.updateValue(suggestion);
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
  
  renderInputComponent = inputProps => (
    <div>
      <input {...inputProps} className="uk-input"/>
    </div>
  );

  render() {
    const inputProps = {
      placeholder: this.props.placeholder,
      value: this.state.value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        multiSection={true}
        highlightFirstSuggestion={true}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
        inputProps={inputProps}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        renderInputComponent={this.renderInputComponent}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    );
  }
}


