require.config({
    paths: {
        B: './moduleB'
    }
})

define(['B'], function(B){
    return B;
})