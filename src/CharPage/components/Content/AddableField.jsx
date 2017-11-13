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
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.values[field] = event.target.value;
      return newState;
    });
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
    <div className="column-group quarter-gutters">
      <label className="all-40 align-left" htmlFor="name">{props.children}</label>
      <div className="control all-60">
        <input
          className="text-field"
          type="text"
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
    </div>
  )
}