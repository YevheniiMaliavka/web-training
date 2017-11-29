import * as React from 'react';
import { Card, CardTitle } from 'react-materialize';

export function App(props: any) {
  const facts = props.facts.map((fact: string, i: number) => (
    <Card
      title={`Fact ${i + 1}`}
      className="blue-grey darken-1"
      key={i}
      reveal={<p>Here is some more information about me... (No! ^^°/)</p>}
    >
      {fact}
    </Card>
  ));
  return facts;
}
