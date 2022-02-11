// 实现一个 Filter 工具类型，用于根据类型变量 F 的值进行类型过滤。具体的使用示例如下所示：

namespace Filter {
  
  type F0 = Filter<[6, "lolo", 7, "semlinker", false], number>; // [6, 7]
  type F1 = Filter<["kakuqo", 2, ["ts"], "lolo"], string>; // ["kakuqo", "lolo"]
  type F2 = Filter<[0, true, any, "abao"], string>; // [any, "abao"]
  
  type Filter<T extends any[], F, Idx extends number = 0, Result extends any[] = []> = Idx extends T['length']
    // 终止条件
    ? Result
    : T[Idx] extends F
      ? Filter<T, F, Calc.Add<Idx, 1>, [...Result, T[Idx]]>
      : Filter<T, F, Calc.Add<Idx, 1>, Result>
}