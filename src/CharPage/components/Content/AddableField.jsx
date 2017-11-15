import React from 'react';

export class AddableField extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      fields: ['field-0'],
      values: {}
    }
  }

  componentDidMount() {
  }

  addField = (event) => {
    event.preventDefault();
    const newField = `field-${this.state.fields.length}`;
    this.setState(prevState => ({
      ...prevState,
      fields: [...prevState.fields, newField]
    }))
  }

  handleChange = (field, event) => {
    console.log('handle change', field.id)
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.values[field] = event.target.value;
      return newState;
    });
    this.updateValue(field)(event.target.value);
  }

  render() {
    return (
      <div>
        {this.state.fields.map(field => 
          <Field
            key={field}
            value={this.state.values[field]}
            onChange={this.handleChange}
          >
            Label
          </Field>
        )}
        <button onClick={this.addField}>
          Add field
        </button>
      </div>
    )
  }
}

function Field(props) {
  return (
    <div className="">
      {/* <label className="uk-form-label" htmlFor="name">{props.children}</label> */}
      <div className="uk-form-controls">
        <input
          className="text-field uk-input"
          type="text"
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
    </div>
  )
}