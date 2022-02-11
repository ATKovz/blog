// 实现 Unpacked 工具类型，用于对类型执行 “拆箱” 操作。具体的使用示例如下所示：

namespace Unpacked {

  
  type T00 = Unpacked<string>;  // string
  type T01 = Unpacked<string[]>;  // string
  type T02 = Unpacked<() => string>;  // string
  type T03 = Unpacked<Promise<string>>;  // string
  type T04 = Unpacked<Unpacked<Promise<string>[]>>;  // string
  type T05 = Unpacked<any>;  // any
  type T06 = Unpacked<never>;  // never

  type Unpacked<T> = T extends () => infer J
    ? J
    : T extends (infer J)[]
      ? J
      : T extends Promise<infer J>
        ? J
        : T extends Promise<(infer J)[]>
          ? J
          : T extends ('' & 1)
            ? any
            : (0 & 1) extends T
              ? never
              : never
}
