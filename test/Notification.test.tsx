import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Notification } from '../stories/Notification.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Notification />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
