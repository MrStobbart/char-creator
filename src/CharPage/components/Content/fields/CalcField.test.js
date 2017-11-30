import React from 'react';
import ReactDOM from 'react-dom';
import { CalcField } from './CalcField';

it('shallow renders without crashing', () => {
  shallow(<CalcField
    charSheetData={{ test: 1 }}
    calculation={'1 + 2'}
    modifier={0}
  />);
})

it('adds numbers', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ test: 1 }}
    calculation={'1 + 2'}
    modifier={0}
  />);
  expect(wrapper.state().value).toEqual(3);
})

it('substracts numbers', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ test: 1 }}
    calculation={'1 - 2'}
    modifier={0}
  />);
  expect(wrapper.state().value).toEqual(-1);
})

it('multiplies numbers', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ test: 1 }}
    calculation={'1 * 2'}
    modifier={0}
  />);
  expect(wrapper.state().value).toEqual(2);
})

it('divides numbers', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ test: 1 }}
    calculation={'4 / 2'}
    modifier={0}
  />);
  expect(wrapper.state().value).toEqual(2);
})

it('uses propteries for calculation', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ firstValue: 1, secondValue: 5 }}
    calculation={'firstValue + secondValue'}
    modifier={0}
  />);
  expect(wrapper.state().value).toEqual(6);
})

it('can use more than two values', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ firstValue: 1, secondValue: 5 }}
    calculation={'firstValue + secondValue - 2 + 4'}
    modifier={0}
  />);
  expect(wrapper.state().value).toEqual(8);
})

it('can deal with missing properties', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ firstValue: 1, }}
    calculation={'firstValue + secondValue - 2 + 4'}
    modifier={0}
  />);
  expect(wrapper.state().value).toEqual(3);
})

it('uses a modifier', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ firstValue: 1, }}
    calculation={'firstValue + secondValue - 2 + 4'}
    modifier={3}
  />);
  expect(wrapper.state().value).toEqual(6);
})

it('uses a negativ modifier', () => {
  const wrapper = shallow(<CalcField
    charSheetData={{ firstValue: 1, }}
    calculation={'firstValue + secondValue - 2 + 4'}
    modifier={-2}
  />);
  expect(wrapper.state().value).toEqual(1);
})




