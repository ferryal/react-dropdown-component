import React from 'react';
import * as ReactDOM from 'react-dom';
import { Heading, SubTitle, BodyText, Caption } from '../stories/Text.stories';

describe('Thing', () => {
  it('renders without crashing Heading', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Heading />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing Subtitle', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubTitle />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing BodyText', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BodyText />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing Captiion', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Caption />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
