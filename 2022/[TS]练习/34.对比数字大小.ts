// 实现一个 SmallerThan 工具类型，用于比较数值类型的大小。具体的使用示例如下所示：
namespace SmallThan {

  
  type S0 = SmallerThan<0, 1>; // true
  type S1 = SmallerThan<2, 0>; // false
  type S2 = SmallerThan<8, 10>; // true

  // ts的大小对比只能通过逐个比对，而且只能对比 Int 
  type SmallerThan<
    N extends number,
    M extends number,
    NN extends number = N,
    MM extends number = M,
  > = M extends N
  ? false
  : N extends MM
      ? true
      : M extends NN
        ? false
        : SmallerThan<Calc.Add<N, 1>, Calc.Add<M, 1>, NN, MM>

  type LargeThan<N extends number, M extends number> = SmallerThan<N, M> extends true ? false : true
}