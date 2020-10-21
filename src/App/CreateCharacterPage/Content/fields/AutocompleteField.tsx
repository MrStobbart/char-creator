import React from 'react';
import { Input, AutoComplete } from 'antd';
import './AutocompleteField.css';

type Data = { label: string; requirements: string; information: string; shortInformation: string };
const example: Data = {
  label: 'Aristokratin',
  requirements: 'Anfänger',
  information:
    'Der Charakter ist sehr privilegiert aufgewachsen oder kam im späteren Leben dazu. Auch wenn sie nicht unbedingt reich ist (Talent Reich oder sehr Reich), aber sie versteht sich sehr gut auf den Umgang mit elitären Kreisen. Sie bekommt einen Bonus von +2 auf Überreden beim Netzwerken innerhalb der lokalen Elite, Unternehmensbossen oder anderen Aristokraten. Außerdem bekommt sie einen Bonus von +2 auf Allgemeinwissen Proben wenn es um Etikette der Oberschicht oder ähnliches geht.',
  shortInformation: '+2 Überreden und Allgemeinwissen wenn es um die Oberschicht geht.',
};
const example2: Data = {
  label: 'Doktors',
  requirements: 'Anfänger',
  information:
    'Der Charakter ist sehr privilegiert aufgewachsen oder kam im späteren Leben dazu. Auch wenn sie nicht unbedingt reich ist (Talent Reich oder sehr Reich), aber sie versteht sich sehr gut auf den Umgang mit elitären Kreisen. Sie bekommt einen Bonus von +2 auf Überreden beim Netzwerken innerhalb der lokalen Elite, Unternehmensbossen oder anderen Aristokraten. Außerdem bekommt sie einen Bonus von +2 auf Allgemeinwissen Proben wenn es um Etikette der Oberschicht oder ähnliches geht.',
  shortInformation: '+2 Überreden und Allgemeinwissen wenn es um die Oberschicht geht.',
};

const renderTitle = (title: string) => {
  return (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
};

const renderItem = (quality: Data) => {
  return {
    value: quality.label,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <div>
          <span style={{ fontWeight: 'bold' }}>{quality.label}</span> ({quality.requirements})
        </div>
        <div style={{ whiteSpace: 'normal', fontStyle: 'italic' }}>{quality.shortInformation}</div>
        <div className="show-on-focus" style={{ whiteSpace: 'normal' }}>
          {quality.information}
        </div>
      </div>
    ),
  };
};

const options = [
  {
    label: renderTitle('Soziale Talente'),
    options: [renderItem(example), renderItem(example2)],
  },
];

interface AutocompleteFieldProps {
  addValue: Function;
}

export const AutocompleteField = (props: AutocompleteFieldProps) => {
  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={1000}
      style={{ width: 250 }}
      options={options}
      filterOption={true}
    >
      <Input.Search size="large" placeholder="input here" />
    </AutoComplete>
  );
};
