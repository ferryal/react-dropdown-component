import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as MultiSelect } from '../stories/MultiSelect.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MultiSelect />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
