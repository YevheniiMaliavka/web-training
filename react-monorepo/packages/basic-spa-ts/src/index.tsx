import * as React from 'react';
import { render } from 'react-dom';
import { FancyTitle, Button } from 'styled-component-ts';

console.log(FancyTitle);
console.log(require('styled-component-ts'));

const FancyApp: React.SFC<{ title: string }> = ({ title }) => (
  <div>
    Test
    <FancyTitle text={title} />
    <Button dark>FooBar</Button>
  </div>
);

render(<FancyApp title="My cool app" />, document.getElementById('app'));
