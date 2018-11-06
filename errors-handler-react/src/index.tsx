import * as React from 'react';
import { render } from 'react-dom';

class UnstableComponent extends React.Component {
  state = { data: 'Empty' };

  async componentDidMount() {
    throw 'FOO';
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

class ErrorBoundary extends React.Component<{
  children: () => Promise<JSX.Element>;
}> {
  state = { error: false, safeChildren: null };

  componentDidCatch() {
    console.log('Did catch!');
    this.setState({ error: true });
  }

  async componentDidMount() {
    try {
      const children = await this.props.children();
      this.setState({ safeChildren: children });
    } catch (err) {
      console.log('Catched it!');
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Error has occured. But Houston is ok :)</h1>;
    }
    return this.state.safeChildren || 'Waiting...';
  }
}

const App = () => (
  <>
    <h1>My App</h1>
    <ErrorBoundary>
      {async () => (
        <>
          <h2>This area is safe. Errors are caught.</h2>
          <UnstableComponent />
        </>
      )}
    </ErrorBoundary>
  </>
);

render(<App />, document.getElementById('app'));
