import * as React from 'react';
import { render } from 'react-dom';
import { FancyTitle } from 'styled-component-ts';

console.log(FancyTitle);
console.log(require('styled-component-ts'));


const FancyApp: React.SFC<{ title: string }> = ({ title }) => (
  <div>
    Test
    <FancyTitle text={title} />
  </div>
);

render(<FancyApp title="My cool app" />, document.getElementById('app'));
