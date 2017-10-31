import React from 'react';
import ReactDOM from 'react-dom';
import { CharPage } from './CharPage';


it('shallow renders without crashing', () => {
  shallow(<CharPage />);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CharPage />, div);
});
