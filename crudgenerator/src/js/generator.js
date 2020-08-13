
const Generator = (function(seed) {

  const rng = new Math.seedrandom(seed)
  
  const randomBetween = (a, b) => Math.floor(rng() * (b - a + 1) + a)
  const takeOne = list => list[randomBetween(0, list.length - 1)]
  
  const generateArray = (f, a = 2, b = 4) => () => new Array(randomBetween(a, b)).fill().map(f)
  const generateNumber = () => randomBetween(0, 99)
  const generateBoolean = () => rng() > 0.5
  const generateCharacter = () => String.fromCharCode(randomBetween(97, 122))
  const generateVowel = () => takeOne(['a', 'e', 'i', 'o', 'u'])
  const generateConsonant = () => takeOne(['b', 'c', 'd', 'f', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'w'])
  const generateSyllable = () => `${generateConsonant()}${generateVowel()}`
  const generateWord = () => generateArray(generateSyllable)().join('')
  const generateSentence = () => generateArray(generateWord)().join(' ')
  const generateObject = () => {
    const obj = {}
    const keys = new Array(randomBetween(4, 7)).fill().map(generateWord)
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = randomType()
      if (rng() > 0.7) {
        obj[keys[i]].default = obj[keys[i]].generator()
      }
    }
    return object(obj)
  }
  
  const randomType = () => takeOne([
    number(),
    boolean(),
    string(),
    array(number())
  ])
  
  const number = () => ({
    type: 'number',
    generator: generateNumber
  })
  const boolean = () => ({
    type: 'boolean',
    generator: generateBoolean
  })
  const string = () => ({
    type: 'string',
    generator: generateWord
  })
  const array = x => ({
    type: [x.type],
    generator: generateArray(x.generator)
  })
  
  const object = o => {
    const ans = { type: {} }
    for (const key in o) {
      ans.type[key] = { type: o[key].type }
      if (o[key].default) {
        ans.type[key].default = o[key].default
      }
    }
    ans.generator = () => {
      const generated = {}
      for (const key in o) {
        if (o[key].default) {
          generated[key] = o[key].default
        } else {
          generated[key] = o[key].generator()
        }
      }
      return generated
    }
    return ans
  }
  
  return {
    generateObject
  }
})

// const obj = generateObject()
// console.log(obj.type)
// console.log(obj.generator())
