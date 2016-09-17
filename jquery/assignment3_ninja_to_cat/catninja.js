$(document).ready(function(){
    $('ul').sortable();
    //setup ninja to cat
    //ideal place for a loop and to shuffle an array of 0 to 4 to randomly place these.
    $('ul').append('<li><img src="images/ninja2.png" data-alt-src="images/cat2.png" /></li>');
    $('ul').append('<li><img src="images/cat0.png" data-alt-src="images/ninja0.png" /></li>');
    $('ul').append('<li><img src="images/cat1.png" data-alt-src="images/ninja1.png" /></li>');
    $('ul').append('<li><img src="images/cat4.png" data-alt-src="images/ninja4.png" /></li>');
    $('ul').append('<li><img src="images/cat3.png" data-alt-src="images/ninja3.png" /></li>');

    $('img').click(function(){
        var imgshow = $(this).attr('data-alt-src');
        console.log("Replacing " + $(this).attr('src') + " with " + $(this).attr('data-alt-src'));
        $(this).attr('data-alt-src',$(this).attr('src'));
        $(this).attr('src',imgshow);
    });
});
