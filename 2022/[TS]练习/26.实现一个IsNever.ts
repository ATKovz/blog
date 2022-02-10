// 实现一个 IsNever 工具类型，判断指定的类型是否为 never 类型。具体的使用示例如下所示：
namespace IsNever {
  type I0 = IsNever<never> // true
  type I1 = IsNever<never | string> // false
  type I2 = IsNever<null> // false

  // 和 25 题类似，用数组来分发
  // 同时由于never extends never 固定为 false，所以要用[never] extends [never] 来判断
  type IsNever<N> = [N] extends [never] ? true : false
}