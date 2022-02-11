// 实现 AnyOf 工具类型，只要数组中任意元素的类型非 Falsy 类型、 {} 类型或 [] 类型，则返回 true，否则返回 false。如果数组为空的话，则返回 false。具体的使用示例如下所示：

namespace AnyOf {
  type A0 = AnyOf<[]>; // false
  type A1 = AnyOf<[0, '', false, [], {}]> // false
  type A2 = AnyOf<[1, "", false, [], {}]> // true
  
  type isFalsy<T> = T extends (0 | '' | false | [])
    ? true
    : false
  
  type isEmptyObj<T> = T extends {}
    ? {} extends T
      ? true
      : false
    : false
  
  type CheckIsValid<T> = isEmptyObj<T> extends true
    ? false
    : isFalsy<T> extends true
      ? false
      : true
  
  type D = CheckIsValid<123>
  
  type AnyOf<T extends any[]> = T extends [infer Head, ...infer Rest]
    ? CheckIsValid<Head> extends true
      ? true
      : AnyOf<Rest>
    : CheckIsValid<T[0]>
}
