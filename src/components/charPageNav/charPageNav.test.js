import React from 'react';
import ReactDOM from 'react-dom';
import { CharPageNav } from './CharPageNav';

it('shallow renders without crashing', () => {
  shallow(<CharPageNav />);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CharPageNav />, div);
});