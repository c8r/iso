import chroma from 'chroma-js'

export const isDark = val => chroma(val).luminance() < 0.5
export const luminance = val => n => chroma(val).luminance(n).css()
export const alpha = val => n => chroma(val).alpha(n).css()
export const L = n => 1 - Math.log(n + .5) / Math.LN10

export const createGrays = (a, b, dark) => {
  const f = chroma.scale([ a, b ])
  const gray = Array.from({ length: 10 })
    .map((n, i) => i)
    .map(L)
    .map(f)
    .map(color => color.hex())
    .reduce((a, b, i) => Object.assign(a, { ['gray' + i]: b }), {})

  return gray
}

export const createColors = base => {
  try {
    const dark = isDark(base)
    const bg = base
    const text = dark ? '#fff' : '#000'
    const grays = createGrays(bg, text, dark)
    return {
      text,
      bg,
      ...grays
    }
  } catch (e) {
    return {}
  }
}
