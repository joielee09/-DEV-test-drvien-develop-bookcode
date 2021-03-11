class Dollar {
  constructor(){}
  times(amount, multiplier) {
    return (amount*multiplier);
  }
}

describe('TDD book test', () => {
  let dollar = new Dollar();
  it('test1', () => {
    expect(dollar.times(2,5)).toBe(10);
  })
})