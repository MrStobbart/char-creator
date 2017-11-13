import React from 'react';
import './CharHeader.css';


export function CharHeader(props) {


  console.log('PRops', props)

  switch (props.charSheetId) {
    case 'savageWorldsFantasy':
      return savageWorldsHeader(props);
    default:
      console.error('Unkown char sheet id'); 
      return null;
  }
}


function savageWorldsHeader(props) {

  let attributePoints = 10;
  let edgePoints = 0;
  let skillPoints = 50;

  let skillPoint = props.meta.charCreationPoints;
  console.log('availablePoints', skillPoint)
  for (let fieldKey in props.charSheetData) {
    const field = props.charSheetData[fieldKey];

    switch (field.calculationType) {
      case 'attribute':
        attributePoints -= field.value;
        break;
      case 'skill':
        calculateSkillPoints(field.value, props.charSheetData[field.attribute].value, 2)
        break;
      case 'cheapSkill':
        calculateSkillPoints(field.value, props.charSheetData[field.attribute].value, 1)
        break;
      case 'edge':
        edgePoints -= field.value * 2; 
        break;
      case 'hinderance':
        edgePoints += field.value * 2; 
        break;
      case 'smallHinderance':
        edgePoints += field.value; 
        break;
      default: 
      break;
    }
  }

  function calculateSkillPoints(skillValue, attributeValue, cost) {
    if (skillValue <= attributeValue) {
      skillPoints -= skillValue * cost;
    } else {
      skillPoints -= (attributeValue * cost + (skillValue - attributeValue) * cost * 2);
    }
  }

  return (
    <div className="char-header ink-grid">
      <div className="column-group gutters">
        <div className="xlarge-25 large-25 medium-50 small-100 tiny-100">
          Remaining char points: {skillPoints / 2}
        </div>
        <div className="xlarge-25 large-25 medium-50 small-100 tiny-100">
          Remaining attribute points: {attributePoints}
        </div>
        <div className="xlarge-25 large-25 medium-50 small-100 tiny-100">
          Remaining talent points: {edgePoints / 2}
        </div>
        <div className="xlarge-25 large-25 medium-50 small-100 tiny-100">
          <button onClick={props.saveChanges}>
            {props.unsavedChanges ? 'Unsaved changes': 'Everything saved'}
          </button>
        </div>  
        <div className="xlarge-25 large-25 medium-50 small-100 tiny-100">
          <button>
            Finish char creation
          </button>
        </div>  
      </div>  
    </div>
  )
  
}