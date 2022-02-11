namespace ToNumber {
  // 实现一个 ToNumber 工具类型，用于实现把数值字符串类型转换为数值类型。具体的使用示例如下所示：
  type T0 = ToNumber<"0">; // 0
  type T1 = ToNumber<"10">; // 10
  type T2 = ToNumber<"20">; // 20

  // 有过深递归问题，TS目前看来没法根治，只能通过按位算来尽可能避免
  type ToNumber<T extends string, N extends number = 0> = T extends `${N}`
    ? N
    : ToNumber<T, Calc.Add<N, 1>>
}