require.config({
    paths: {
        A: './moduleA'
    }
})

require(['A'], function(A){
    console.log(A)
})