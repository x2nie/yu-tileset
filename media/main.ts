// export const pi = 3.14;

// Self executing anonymous function
// This is the main entry point
(async () => {
    //
    const node = document.createElement('div')
    node.innerHTML = ('soyuz')
    document.body.appendChild(node)
    setTimeout(() => {
        document.getElementById('teaser')!.innerHTML = "<b>hola!</b>"
        
    }, 1000);
    document.title='Ha Hola'
})()