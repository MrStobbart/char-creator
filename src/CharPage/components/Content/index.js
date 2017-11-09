import React from 'react';
import { Fieldset } from './Fieldset';

export function Content(props) {
  console.log('charsheet props', props);
  let fieldsets = '';
  if (props.charSheet) {
    fieldsets = props.charSheet.map(fieldset => <Fieldset key={fieldset.id} fieldset={fieldset} meta={{ defaultValues: props.meta.defaultValues }}/>);
  }
  return (
    <div className="xlarge-80 large-80 medium-70 small-100 tiny-100">
      <form>
        {fieldsets}
      </form>
    </div>
  )
}