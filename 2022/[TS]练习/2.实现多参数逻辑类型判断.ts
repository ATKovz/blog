
// 原函数，下面第二第三没有报错，不符合预期
function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok

// 解法1
function fixed1<T extends string | number>(a: T, b: T) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

fixed1(2, 3); // Ok
fixed1(1, 'a'); // Error
fixed1('a', 2); // Error
fixed1('a', 'b') // Ok

// 解法2
function fixed2<A extends string | number, B extends A extends string
  ? string
  : number
>(a: A, b: B) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

fixed2(2, 3); // Ok
fixed2(1, 'a'); // Error
fixed2('a', 2); // Error
fixed2('a', 'b') // Ok