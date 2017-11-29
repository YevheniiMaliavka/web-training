import React from 'react';
import { render } from 'react-dom';
import { App } from '../shared/app';

console.log('Foo');

render(<App />, document.querySelector('#app'));