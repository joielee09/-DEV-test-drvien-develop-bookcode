function test() {
  return 'Hello, world!';
}

const times = (amount, multiplier) => {
  return amount*multiplier;
}

describe('TDD book test', () => {
  it('test1', () => {
    expect(times(2,5)).toBe(10);
  })
})