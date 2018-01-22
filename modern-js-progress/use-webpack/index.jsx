import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';

const MyComponent = () => <h1>{'Current Time: ' + moment().format('MMMM Do, h:mm:ss')}</h1>

render(<MyComponent/>, document.getElementById('app'));
