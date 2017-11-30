import Enzyme, { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render, mount } from 'enzyme';

// React 16 enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make enzyme functions available without import
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};