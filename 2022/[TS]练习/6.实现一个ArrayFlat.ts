// 第六题
// 定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化）。具体的使用示例如下所示：

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"
// 在完成 NaiveFlat 工具类型之后，在继续实现 DeepFlat 工具类型，以支持多维数组类型：

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>  
// DeepTestResult: "a" | "b" | "c" | "d" | "e"

type NaiveFlat<T extends any[]> = T extends [...infer H, infer R]
  // 逐个 pop 出来递归平铺
  ? R extends any[]
    ? [...NaiveFlat<H>, ...NaiveFlat<R>]
    : [...NaiveFlat<H>, R]
  : T

type DeepFlat<T extends any[]> = NaiveFlat<T>
