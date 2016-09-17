$(document).ready(function(){
    for(var i = 0; i < 4; i++){
        console.log('Adding list item #' + i)
        $('ul').append('<li></li>');
    }
    $('li').html('<img src="ninja.jpeg" width="50%" alt="Ninja">');
    $('img').click(function(){
        $(this).hide("slow");
    });
    $('button').click(function(){
        $('img').show("slow");
    });
});
