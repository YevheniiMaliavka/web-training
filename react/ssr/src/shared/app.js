import * as React from 'react';
import { Card, CardTitle } from 'react-materialize';

const defaultFacts = ['I am 21 now', 'I am going 22 in 13 days', 'I like december'];

class CustomCard extends React.Component {
  componentDidMount() {
    console.log('Component CustomCard Did Mount');
  }

  render() {
    const { i, fact } = this.props;
    return <Card
      title={`Fact ${i + 1}`}
      className="blue-grey darken-1"
      key={i}
      reveal={<p>Here is some more information about me... (No! ^^°/)</p>}
    >
      {fact}
    </Card>
  }
}

export class App extends React.Component {
  componentDidMount() {
    console.log('Component App Did Mount');
  }

  render() {
    const facts = (this.props.facts || defaultFacts).map((fact, i) => (
      <CustomCard key={i} i={i} fact={fact} />
    ));
    return facts;
  }
}
