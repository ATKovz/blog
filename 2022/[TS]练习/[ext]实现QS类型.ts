namespace QS {
  type ParseBody<T extends String> = T extends `${infer H}=${infer Rest}`
    ? { [key in H]: Rest }
    : Record<string, any>

  type MergeValue<A, B> = A | B

  type Merge<Obj1 extends Record<string, any>, Obj2 extends Record<string, any>> = {
    [key in (keyof Obj1 | keyof Obj2)]: key extends keyof Obj1
      ? key extends keyof Obj2
        ? MergeValue<Obj1[key], Obj2[key]>
        : Obj1[key]
      : key extends keyof Obj2
        ? Obj2[key]
        : never
  }
  type QS<T extends string> = T extends `${infer K}&${infer V}`
    ? Merge<QS<V>, ParseBody<K>>
    : ParseBody<T>

  type R = QS<'a=b&b=c&c=d&a=k'>

}