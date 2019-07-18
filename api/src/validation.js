// @todo: what if the user inserts persian/hindi numbers?
function isIRMobNumber(numOrStr) {
  // Get rid of any spaces, we don't need them
  const input = `${numOrStr}`.replace(/\s/gs, '');

  // Early exit
  if (input.length > (4 + 7)) {
    return false;
  }

  const reg = /^(0?9\d{2})(\d{7})$/;
  return reg.test(input);
}

function isIrHomeTelNumber(numOrStr) {
  // Get rid of any spaces, we don't need them
  const input = `${numOrStr}`.replace(/\s/gs, '');

  // Early exit
  if (input.length > (4 + 8)) {
    return false;
  }

  const reg = /^(0?\d{3,4})(\d{7,8})$/;
  return reg.test(input);
}

export {isIRMobNumber, isIrHomeTelNumber};
