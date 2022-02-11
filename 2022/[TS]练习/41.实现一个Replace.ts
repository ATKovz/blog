namespace Replace {
  
  type R0 = Replace<'', '', ''> // ''
  type R1 = Replace<'foobar', 'bar', 'foo'> // "foofoo"
  type R2 = Replace<'foobarbar', 'bar', 'foo'> // "foofoobar"

  type RA0 = ReplaceAll<'', '', ''> // ''
  type RA1 = ReplaceAll<'barfoo', 'bar', 'foo'> // "foofoo"
  type RA2 = ReplaceAll<'foobarbar', 'bar', 'foo'> // "foofoofoo"
  type RA3 = ReplaceAll<'foobarfoobar', 'ob', 'b'> // "fobarfobar"


  type Replace<
    S extends string,
    From extends string,
    To extends string
  > = S extends `${infer H}${From}${infer E}`
  ? `${H}${To}${E}`
  : S

  type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
  > = S extends `${infer H}${From}${infer E}`
  ? `${ReplaceAll<H, From, To>}${To}${ReplaceAll<E, From, To>}`
  : S
}