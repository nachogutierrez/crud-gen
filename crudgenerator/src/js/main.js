const App = (function() {

    let bindings

    function start() {
        bindings = bind()
        setListeners()
        generate()
    }

    const bind = () => ({
        typeEl: document.getElementById('type'),
        exampleEl: document.getElementById('example'),
        generateEl: document.getElementById('generate'),
        seedEl: document.getElementById('seed'),
        generatedSeedEl: document.getElementById('generated-seed')
    })

    function setListeners() {
        bindings.generateEl.addEventListener('click', () => {
            generate()
        })
    }

    function enableHighlighting() {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        })
    }

    function generate() {
        const seed = bindings.seedEl.value || generateSeed()
        bindings.generatedSeedEl.innerHTML = seed
        const o = Generator(seed).generateObject()
        bindings.typeEl.innerHTML = JSON.stringify(o.type, null, 4)
        bindings.exampleEl.innerHTML = JSON.stringify(o.generator(), null, 4)

        enableHighlighting()
    }

    function generateSeed() {
        const randomBetween = (a, b) => Math.floor(Math.random() * (b - a + 1) + a)
        const randomChar = () => String.fromCharCode(randomBetween(97, 122))
        return new Array(16).fill().map(randomChar).map(x => Math.random() > 0.5 ? x : x.toUpperCase()).join('')
    }

    return {
        start
    }
})()

window.addEventListener('load', App.start)