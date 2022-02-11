// 实现 ConsistsOnlyOf 工具类型，用于判断 LongString 字符串类型是否由 0 个或多个 Substring 字符串类型组成。具体的使用示例如下所示：
namespace ConsistsOnlyOf {

  type ConsistsOnlyOf<LongString extends string, Substring extends string> = any // 你的实现代码
  
  type C0 = ConsistsOnlyOf<'aaa', 'a'> //=> true
  type C1 = ConsistsOnlyOf<'ababab', 'ab'> //=> true
  type C2 = ConsistsOnlyOf<'aBa', 'a'> //=> false
  type C3 = ConsistsOnlyOf<'', 'a'> //=> true
}