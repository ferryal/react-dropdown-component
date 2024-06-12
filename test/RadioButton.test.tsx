import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as RadioButton } from '../stories/RadioButton.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RadioButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
