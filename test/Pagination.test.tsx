import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Pagination } from '../stories/Pagination.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pagination />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
