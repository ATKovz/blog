namespace CamelToSnake {

  type GetIdx<T extends any[], Target extends string, I extends number = 0> = T extends [infer Head, ...infer Rest]
    ? Head extends Target
      ? I
      : I extends number
      ? GetIdx<Rest, Target, Calc.Add<I, 1>>
      : never
    : -1
  
  
  type Alphabet = [
    'a',  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ]
  type AlphabetC = [
    'A',  'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ]
  
  type toLowerCase<T extends string> = Alphabet[GetIdx<AlphabetC, T>]
  
  type CamelToUnderLine<T extends string, IsHead extends boolean = true> =
    T extends `${infer Head}${infer Rest}`
      ? IsHead extends true
      // 首位不做下划线处理
        ? `${toLowerCase<Head>}${CamelToUnderLine<Rest, false>}`
        // 首位不做下划线处理
        : GetIdx<AlphabetC, Head> extends -1
          ? `${Head}${CamelToUnderLine<Rest, false>}`
          : `_${toLowerCase<Head>}${CamelToUnderLine<Rest, false>}`
      // 终止条件
      : T
  
  
  // 测试用例1
  type Result = CamelToUnderLine<'TestCase', true>
  
  // 测试用例2，带有其他自负
  type Result2 = CamelToUnderLine<'TestCase——with other 7hing', true>
}

