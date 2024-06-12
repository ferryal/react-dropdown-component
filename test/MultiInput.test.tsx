import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as MultiInput } from '../stories/MultiInput.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MultiInput />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
