// 第十题
// 实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理。具体的使用示例如下所示：

// 测试用例
type R = Trim<' semlinker '>
//=> 'semlinker'

type TrimHead<V extends string> = V extends ` ${infer Tail}`
  ? Tail
  : V

type TrimTail<V extends string> = V extends `${infer Head} `
  ? Head
  : V

type Trim<V extends string> = TrimHead<TrimTail<V>>

// 你的实现代码
