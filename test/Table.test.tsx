import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Table } from '../stories/Table.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
