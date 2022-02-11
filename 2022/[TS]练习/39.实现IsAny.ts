namespace IsAny {
  // 实现 IsAny 工具类型，用于判断类型 T 是否为 any 类型。具体的使用示例如下所示：

  // 原理: truthy extends (any & xx) 永远为 true
  type IsAny<T> = '' extends (' ' & T)
    ? true
    : false

  type I0 = IsAny<never> // false
  type I1 = IsAny<unknown> // false
  type I2 = IsAny<any> // true
  type I3 = IsAny<undefined> // false
  type I4 = IsAny<213> // false

}