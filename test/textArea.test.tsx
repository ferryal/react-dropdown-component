import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as TextArea } from '../stories/TextArea.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TextArea />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
