// 实现一个 Split 工具类型，根据给定的分隔符（Delimiter）对包含分隔符的字符串进行切割。可用于定义 String.prototype.split 方法的返回值类型。具体的使用示例如下所示：


namespace Split {
  type Item = 'semlinker,lolo,kakuqo';
  
  
  type ElementType = Split<Item, ','>; // ["semlinker", "lolo", "kakuqo"]

  type Push<T extends any[], S extends any> = [...T, S]

  type Split<
    S extends string, 
    Delimiter extends string,
    Stack extends string[] = []
  > = S extends `${infer Head}${Delimiter}${infer Rest}`
    ? Split<Rest, Delimiter, Push<Stack, Head>>
    : Push<Stack, S>
}