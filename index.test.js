// 통화가 다른 두 금액을 더해서 주어진 환율에 맞게 변한 금액을 결과로 얻을 수 있어야한다.
// ✅어떤 금액(주가)을 어떤 수(주식의 수)에 곱한 금액을 결과로 얻을 수 있어야한다.

// ✅Dollar 클래스가 없음
// ✅생성자가 없음
// ✅tiems(int) 스텁 매서드가 없음 -> 스텁: 간단하게 입출력만 만들어 컴파일 되도록 하는 것
// ✅amount 필드가 없음


class Dollar {
  constructor(amount){
    this.amount = amount;
  }
  times(multiplier){
    return new Dollar (this.amount*multiplier);
  }
  equals(object) {
    const dollar = object;
    return this.amount === dollar.amount ;
  }
}

class Franc {
  constructor(amount){
    this.amount = amount;
  }
  times(multiplier){
    return new France (this.amount*multiplier);
  }
  equals(object) {
    const franc = object;
    return this.amount === franc.amount ;
  }
}


describe('TDD book test', () => {
  const five = new Dollar(5);
  it('testMultiplication', () => {
    expect(new Dollar(10)).toEqual(five.times(2));
    expect(new Dollar(15)).toEqual(five.times(3));
  })
  // true 인 경우와 false 인경우를 모두 test한다.
  it ('testEquality', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
    expect(new Dollar(5).equals(new Dollar(6))).toBe(false);
  })
  it('testFranceMultiplication', () => {
    expect(new Dollar(10)).toEqual(five.times(2));
    expect(new Dollar(15)).toEqual(five.times(3));
  })
})