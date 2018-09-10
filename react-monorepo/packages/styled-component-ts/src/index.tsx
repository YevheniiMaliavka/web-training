import * as React from 'react';
import styled from 'styled-components';

export type FancyTitleProps = {
  text: string;
};

const fatItalicStyle = (
  fragments: ReadonlyArray<string>,
  ...args: string[]
) => {
  const firstTag = (
    <span>
      {fragments[0]}
      <b>{args.shift()}</b>
    </span>
  );
  const otherFragments = fragments.slice(1, fragments.length);
  const others = otherFragments.map((fragment: string, index: number) => (
    <span>
      {fragment}
      <i>{args[index]}</i>
    </span>
  ));
  return (
    <>
      {firstTag}
      {others}
    </>
  );
};

const name = 'My first tagged template string';
const question = 'Tried styled thingy?';
const fancyText = fatItalicStyle`Hello ${name}, my question for today: ${question}.`;

export const FancyTitle: React.SFC<FancyTitleProps> = ({ text }) => (
  <div>{fancyText}</div>
);

export const Button = styled.button<{ dark?: boolean }>`
  color: palevioletred;
  border-radius: 3px;
  background: transparent;

  ${({ dark }) =>
    dark &&
    `
      background: black;
    `};
`;
