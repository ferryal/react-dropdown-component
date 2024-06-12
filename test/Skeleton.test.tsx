import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Skeleton } from '../stories/Skeleton.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Skeleton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
