function isIrPhoneNumber(numOrStr) {
  const input = `${numOrStr.trim()}`;
  const re = /^d$/;
  return
}

export {isIrPhoneNumber}

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
