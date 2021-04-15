// 통화가 다른 두 금액을 더해서 주어진 환율에 맞게 변한 금액을 결과로 얻을 수 있어야한다.
// ✅어떤 금액(주가)을 어떤 수(주식의 수)에 곱한 금액을 결과로 얻을 수 있어야한다.

// ✅Dollar 클래스가 없음
// ✅생성자가 없음
// ✅tiems(int) 스텁 매서드가 없음 -> 스텁: 간단하게 입출력만 만들어 컴파일 되도록 하는 것
// ✅amount 필드가 없음

// protected private
class Money {
  constructor(amount, currency) {
    this._amount = amount; // private member convention. 실제로 제한되지 않음
    this._currency = currency;
  }

  static dollar(amount) {
    return new Money(amount, 'USD');
  }

  static franc(amount) {
    return new Money(amount, 'CHF');
  }

  plus(addend) {
    return new Sum(this, addend);
  }

  times(multiplier) {
    return new Money(this._amount * multiplier, this._currency);
  }

  equals(object) {
    return this._amount === object._amount && this._currency === object._currency;
  }

  currency() {
    return this._currency;
  }

  reduce(bank, to) {
    if (this._currency === to) {
      return this;
    }

    const rate = bank.rate(this._currency, to);
    return new Money(this._amount / rate, to);
  }
}

class Expression {

}

class Sum extends Expression {
  constructor(augend, addend) {
    super();
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank, to) {
    const amount = this.augend.reduce(bank, to)._amount + this.addend.reduce(bank, to)._amount;
    return new Money(amount, to);
  }

  plus(addend) {
    return new Sum(this, addend);
  }

  times(multiplier) {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier));
  }
}

class Bank {
  constructor() {
    this._rates = [];
  }

  reduce(source, to) {
    return source.reduce(this, to);
  }

  addRate(from, to, rate) {
    this._rates.push({
      from,
      to,
      rate,
    });
  }

  rate(from, to) {
    let targetRate;
    this._rates.forEach((element) => {
      if (element.from === from && element.to === to) {
        targetRate = element.rate;
      }
    });
    return targetRate;
  }
}



test('Test simple addition', () => {
  const five = Money.dollar(5);
  const sum = five.plus(five);
  const bank = new Bank();
  const reduced = bank.reduce(sum, 'USD');
  expect(reduced).toEqual(Money.dollar(10));
});

test('Test reduce sum', () => {
  const sum = new Sum(Money.dollar(3), Money.dollar(4));
  const bank = new Bank();
  const result = bank.reduce(sum, 'USD');
  expect(result).toEqual(Money.dollar(7));
})

test('Test plus returns sum', () => {
  const five = Money.dollar(5);
  const sum = five.plus(five);
  expect(five).toEqual(sum.augend);
  expect(five).toEqual(sum.addend);
});

test('Test multiplication', () => {
  const five = Money.dollar(5);
  expect(five.times(2)).toEqual(Money.dollar(10));
  expect(five.times(3)).toEqual(Money.dollar(15));
});

test('Test franc multiplication', () => {
  const five = Money.franc(5);
  expect(five.times(2)).toEqual(Money.franc(10));
  expect(five.times(3)).toEqual(Money.franc(15));
});

test('Test equality', () => {
  expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
  expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
  expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
});

test('Test currency', () => {
  expect(Money.dollar(1).currency()).toBe('USD');
  expect(Money.franc(1).currency()).toBe('CHF');
});

test('Test reduce money different currency', () => {
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const result = bank.reduce(Money.franc(2), 'USD');
  expect(result).toEqual(Money.dollar(1));
});

test('Test reduce same currency', () => {
  const bank = new Bank();
  expect(Money.dollar(5).reduce(bank, 'USD')).toEqual(Money.dollar(5));
})

test('Test mixed addition', () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);
  const bank = new Bank();

  bank.addRate('CHF', 'USD', 2);
  const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD');

  expect(result).toEqual(Money.dollar(10));
});

test('Test sum plus', () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
  const result = bank.reduce(sum, 'USD');
  expect(result).toEqual(Money.dollar(15));
});

test('Test sum times', () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const sum = new Sum(fiveBucks, tenFrancs).times(2);
  const result = bank.reduce(sum, 'USD');
  expect(result).toEqual(Money.dollar(20));
});