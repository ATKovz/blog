// 七题
// 使用类型别名定义一个 EmptyObject 类型，使得该类型只允许空对象赋值：

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
const shouldFail: EmptyObject = { // 将出现编译错误
  prop: "TS"
}
// 在通过 EmptyObject 类型的测试用例检测后，我们来更改以下 takeSomeTypeOnly 函数的类型定义，让它的参数只允许严格SomeType类型的值。具体的使用示例如下所示：

type SomeType =  {
  prop: string
}

// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly(x: SomeType) { return x }

// 测试用例：
const x = { prop: 'a' };
takeSomeTypeOnly(x) // 可以正常调用

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y) // 将出现编译错误

// A:
type EmptyObject = {
  [k: string | number | symbol]: never
}

type StrictObject<T, T1 extends T> = {
  // T 为目标类型，keyof T 会严格遵守 T类型。而T1不一定严格遵守
  // 所以用 K in keyof T1 可以拿到 keyof T 和 keyof T 的补集(other string)，并用补集排除
  [K in keyof T1]: K extends keyof T ? T1[K]: never
}

// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function fixedTakeSomeTypeOnly<T extends SomeType>(x: StrictObject<SomeType, T>) {
  return x
}

// 测试用例：
fixedTakeSomeTypeOnly(x) // 可以正常调用

fixedTakeSomeTypeOnly(y) // 将出现编译错误
