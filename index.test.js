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
}


describe('TDD book test', () => {

  let product;
  const five = new Dollar(5);

  it('test multiplication', () => {
    product = five.times(2);
    expect(product.amount).toBe(10);
    product = five.times(3);
    expect(product.amount).toBe(15);
  })

})