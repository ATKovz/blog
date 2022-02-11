// 实现 IndexOf 工具类型，用于获取数组类型中指定项的索引值。若不存在的话，则返回 -1 字面量类型。具体的使用示例如下所示：
namespace IndexOf {

  
  
  type Arr = [1, 2, 3, 4, 5]
  type I0 = IndexOf<Arr, 0> // -1
  type I1 = IndexOf<Arr, 1> // 0
  type I2 = IndexOf<Arr, 3> // 2
  
  type IndexOf<T extends any[], Target extends any, I extends number = 0> =
  T extends [infer Head, ...infer Rest]
    ? Head extends Target
      ? I
      : I extends number
        ? IndexOf<Rest, Target, Calc.Add<I, 1>>
        : never
    : -1
}