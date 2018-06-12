const assert = require('assert');

function isBalanced(charsString) {
  const unbalancedChars = [];
  const monogamousAndHeterosexual = new Map([
    ['{', '}'],
    ['(', ')'],
    ['[', ']']
  ]);

  const popUnbalancedChar = () => unbalancedChars[unbalancedChars.length - 1];
  const isOpeningChar = char => openingChars.includes(char);
  const isClosingChar = char => closingChars.includes(char);
  const hasProccessedWholeString = position => position >= charsString.length;
  const anyUnbalancedCharLeft = () => !!unbalancedChars.length;

  const closesPreviousChar = char =>
    char === monogamousAndHeterosexual.get(popUnbalancedChar());

  return (function processCharAt(position) {
    const currentChar = charsString.charAt(position);

    if (hasProccessedWholeString(position)) {
      return !anyUnbalancedCharLeft();
    }

    closesPreviousChar(currentChar)
      ? unbalancedChars.pop()
      : unbalancedChars.push(currentChar);

    return processCharAt(position + 1);
  })(0);
}

assert(isBalanced('()[]{}') === true, '()[]{}');
assert(isBalanced('()]{}') === false, '()]{}');
assert(isBalanced('[()]{}') === true, '[()]{}');
assert(isBalanced('()[]({[((()))]})') === true, '()[]({[((()))]})');
assert(isBalanced('()[]([((()))]})') === false, '()[]([((()))]})');
assert(isBalanced('()[]({[((())]})') === false, '()[]({[((())]})');
