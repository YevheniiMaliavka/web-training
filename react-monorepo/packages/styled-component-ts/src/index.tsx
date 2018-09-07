import * as React from 'react';

export type FancyTitleProps = {
  text: string;
};

export const FancyTitle: React.SFC<FancyTitleProps> = ({ text }) => (
  <div>{text}</div>
);