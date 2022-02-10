// 实现一个 Reverse 工具类型，用于对元组类型中元素的位置颠倒，并返回该数组。元组的第一个元素会变成最后一个，最后一个元素变成第一个。

namespace Reverse {
  
  type R0 = Reverse<[]> // []
  type R1 = Reverse<[1, 2, 3, 4]> // [3, 2, 1]
  
  type Reverse<
    T extends Array<any>,
    R extends Array<any> = []
  > = T extends [infer Head, ...infer Rest]
    ? Reverse<Rest, [Head, ...R]>
    : R
}