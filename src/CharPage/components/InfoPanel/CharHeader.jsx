import React from 'react';
import classNames from 'classnames';
import './CharHeader.css';


export function CharHeader(props) {


  switch (props.charSheetId) {
    case 'savageWorldsFantasy':
      return savageWorldsHeader(props);
    default:
      console.log('Char sheet not yet loaded'); 
      return null;
  }
}

function savageWorldsHeader(props) {
  

  let attributePoints = 10;
  let edgePoints = 0;
  let skillPoints = 50;

  let skillPoint = props.meta.charCreationPoints;
  props.meta.charCreationInformation.forEach(information => {
    
    information.forFieldsets.forEach(fieldsetId => {

      for (let fieldKey in props.charData[fieldsetId]) {
        const field = props.charData[fieldsetId][fieldKey];

        switch (field.calculationType) {
          case 'attribute':
            attributePoints -= field.value;
            break;
          case 'skill':
            calculateSkillPoints(field.value, props.charData.attributes[field.attribute].value, 2)
            break;
          case 'cheapSkill':
            calculateSkillPoints(field.value, props.charData.attributes[field.attribute].value, 1)
            break;
          default:
            break;
        }
      }

    })

    
  })

  // TOTO check special calculation

  // TODO check equipment calculation

  function calculateSkillPoints(skillValue, attributeValue, cost) {
    if (skillValue <= attributeValue) {
      skillPoints -= skillValue * cost;
    } else {
      skillPoints -= (attributeValue * cost + (skillValue - attributeValue) * cost * 2);
    }
  }

  return (

    <div>
      <DisplayField value={skillPoints / 2}>
        Fertigkeitspunkte  
      </DisplayField>
      <DisplayField value={attributePoints}>
        Attributspunkte
      </DisplayField>
      <DisplayField value={edgePoints / 2}>
        Talentpunkte
      </DisplayField>
      <div className="uk-margin">
        <button className="uk-button uk-button-default uk-button-small" onClick={props.saveChanges}>
          {props.unsavedChanges ? 'Unsaved changes': 'Everything saved'}
        </button>
      </div>  
      <div className="uk-margin">
        <button className="uk-button uk-button-default uk-button-small">
          Finish char creation
        </button>
      </div>  
    </div>
  )
  
}

class DisplayField extends React.Component{

  render() {
    const classes = classNames({
      'uk-margin uk-alert': true,
      'uk-alert-danger': this.props.value < 0
    });
    return (
      <div className={classes}>
        {this.props.children}: {this.props.value}
      </div>
    )
  }
  
}