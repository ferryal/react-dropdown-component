import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Input } from '../stories/Input.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Input />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
