// @todo: what if the user inserts persian/hindi numbers?
function isIrMobNumber(numOrStr) {
  // Get rid of any spaces, we don't need them
  const input = `${numOrStr}`.replace(/\s/gs, '');

  // Early exit
  if (input.length > (4 + 7)) {
    return false;
  }

  const reg = /^(0?9)(\d{2})(\d{7})$/;
  return reg.test(input);
}

function isIrHomeTelNumber(numOrStr) {
  throw new Error('not implemented yet');
}

export {isIrMobNumber, isIrHomeTelNumber};

const regex = /^([0]?[9])(\d{2})\s*(\d{7})\s*$/gm;
const str = `0912 3017212
8398515968`;
let m;

while ((m = regex.exec(str)) !== null) {
  // This is necessary to avoid infinite loops with zero-width matches
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  // The result can be accessed through the `m`-variable.
  m.forEach((match, groupIndex) => {
    console.log(`Found match, group ${groupIndex}: ${match}`);
  });
}
