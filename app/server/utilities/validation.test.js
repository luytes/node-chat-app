const expect = require('expect');
// import isRealString
const {isRealString} = require('./validation');
// isRealString
// should reject non-string values, reject string with only spaces, allow string with non-space characters
describe('isRealString', () => {
  it('should reject non-strong values', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var res = isRealString('    ');
    expect(res).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    var res = isRealString(' Kevin ');
    expect(res).toBe(true);
  });
});
