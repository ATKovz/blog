// 实现一个 Permutation 工具类型，当输入一个联合类型时，返回一个包含该联合类型的全排列类型数组。具体的使用示例如下所示：
namespace Permutation {

  
  // ["a", "b"] | ["b", "a"]
  type P0 = Permutation<'a' | 'b'>  // ['a', 'b'] | ['b' | 'a']
  // type P1 = ["a", "b", "c"] | ["a", "c", "b"] | ["b", "a", "c"] 
  // | ["b", "c", "a"] | ["c", "a", "b"] | ["c", "b", "a"]
  type P1 = Permutation<'a' | 'b' | 'c'> 
  // 请在下面评论你的答案
  type Permutation<T, K=T> = any// 你的实现代码
}