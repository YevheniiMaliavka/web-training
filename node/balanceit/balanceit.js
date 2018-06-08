function isBalanced(charsString) {
  const openingChars = [];

  function getLastChar() {
    return openingChars[openingChars.length - 1];
  }

  const closing = ['}', ')', ']'];
  const opening = ['{', '(', '['];

  const isOpeningChar = char => opening.includes(char);
  const isClosingChar = char => closing.includes(char);

  const closesPrevious = char => {
    const lastChar = getLastChar();
    if (char === ')') {
      return lastChar === '(';
    }
    if (char === ']') {
      return lastChar === '[';
    }
    if (char === '}') {
      return lastChar === '{';
    }
    return false;
  };

  function balance(position) {
    if (position >= charsString.length) {
      if (openingChars.length === 0) {
        return true;
      }
      return false;
    }

    const currentChar = charsString.charAt(position);

    if (openingChars.length === 0) {
      if (isClosingChar(currentChar)) {
        return false;
      }
      openingChars.push(currentChar);
      return balance(position + 1);
    }

    if (isClosingChar(currentChar) && closesPrevious(currentChar)) {
      openingChars.pop();
      return balance(position + 1);
    }
    openingChars.push(currentChar);
    return balance(position + 1);
  }
  return balance(0);
}

console.log('1.', isBalanced('()[]{}') === true);
console.log('2.', isBalanced('()]{}') === false);
console.log('3.', isBalanced('[()]{}') === true);
console.log('4.', isBalanced('()[]({[((()))]})') === true);
console.log('5.', isBalanced('()[]({[((()]))]})') === false);
console.log('6.', isBalanced('()[]({[((())]})') === false);
