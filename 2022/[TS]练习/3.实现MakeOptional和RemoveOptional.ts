// 第三题
// 在 掌握 TS 这些工具类型，让你开发事半功倍 这篇文章中，阿宝哥介绍了 TS 内置的工具类型：Partial<T>，它的作用是将某个类型里的属性全部变为可选项 ?。

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

// lib.es5.d.ts
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };
// 那么如何定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的？对应的使用示例如下所示：

type Foo1 = {
	a: number;
	b?: string;
	c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo1, 'a' | 'b'>;

// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean; 
// }
// 在实现 SetOptional 工具类型之后，如果你感兴趣，可以继续实现 SetRequired 工具类型，利用它可以把指定的 keys 对应的属性变成必填的。对应的使用示例如下所示：

type Foo2 = {
	a?: number;
	b: string;
	c?: boolean;
}

// 测试用例
type SomeRequired = SetRequired<Foo2, 'b' | 'c'>;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }

// A:
type SetOptional<T extends Object, K extends keyof T> = {
  [Key in keyof T as Key extends K ? Key : never]?: T[Key]
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}

type SetRequired<T extends Object, K extends keyof T> = {
  // 可以用 -? 来移除可选属性
  [Key in keyof T as Key extends K ? Key : never]-?: T[Key]
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}
