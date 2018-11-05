import * as React from 'react';
import { render } from 'react-dom';

class UnstableComponent extends React.Component {
  state = { data: 'Empty' };

  async componentDidMount() {
    throw new Error('Woah, something happened!');
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    const data = await response.text();
    this.setState({ data });
  }

  render() {
    return <p>Data: {this.state.data}</p>;
  }
}

class ErrorBoundary extends React.Component {
  state = { error: false };

  componentDidCatch() {
    console.log('Did catch!');
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <h1>Error has occured. But Houston is ok :)</h1>;
    }
    return this.props.children;
  }
}

const App = () => (
  <>
    <h1>My App</h1>
    <ErrorBoundary>
      <h2>This area is safe. Errors are caught.</h2>
      <UnstableComponent />
    </ErrorBoundary>
  </>
);

render(<App />, document.getElementById('app'));
