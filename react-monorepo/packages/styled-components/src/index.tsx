import * as React from 'react';

type MegaProps = {
  title: string;
};

export const MegaComponent: React.SFC<MegaProps> = ({ title }) => (
  <h1>Hello, {title}!</h1>
);
