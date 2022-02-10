// 实现一个 IsUnion 工具类型，判断指定的类型是否为联合类型。具体的使用示例如下所示：

namespace IsUnion {
  type I0 = IsUnion<string|number> // true
  type I1 = IsUnion<string|never> // false
  type I2 =IsUnion<string|unknown> // false

  type IsUnion<T, U = T> = T extends any
  // 泛型在 extends 会自动分发, 所以这里取普通类型
  // 如果T = a ｜ b
  // 即下面约等于 ([a | b] extends [a]) || ([a | b] extends [b])
  // 所以 如果为 false, 就是 Union
  ? [U] extends [T]
    ? false
    : true
  : never
}
