// 实现一个 Flat 工具类型，支持把数组类型拍平（扁平化）。具体的使用示例如下所示：

namespace Flat {
  
  type F0 = Flat<[]> // []
  type F1 = Flat<['a', 'b', 'c']> // ["a", "b", "c"]
  type F2 = Flat<['a', ['b', 'c'], ['d', ['e', ['f']]]]> // ["a", "b", "c", "d", "e", "f"]

  // 通过简单递归实现
  type Flat<T extends any[], I extends number = 0, R extends any[] = []> =
    I extends T['length']
        ? R
        : T[I] extends any[]
          ? Flat<T, Calc.Add<I, 1>, [...R, ...Flat<T[I]>]>
          : Flat<T, Calc.Add<I, 1>, [...R, T[I]]>
}