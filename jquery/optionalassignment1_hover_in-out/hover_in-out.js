$(document).ready(function(){
    for(var i = 0; i < 4; i ++){
        $('ul').append('<li><img src="ulamog.jpg" data-alt-src="kozilek.jpg" alt="one of the greats" /></li>')
    };
    $('img').hover(function(){
        console.log("changing photo to kozilek");
        var temp = $(this).attr('src');
        $(this).attr('src',$(this).attr('data-alt-src'));
        $(this).attr('data-alt-src',temp);
    }, function(){
        console.log("changing photo back to ulamog");
        var temp = $(this).attr('src');
        $(this).attr('src',$(this).attr('data-alt-src'));
        $(this).attr('data-alt-src',temp);
    });
});
