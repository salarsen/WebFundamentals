$(document).ready(function(){
    $(document).on('click','button',function(){
        console.log('Adding a person');
        $('ul').append('<li ><h1>' + $('#first_name').val() + " " + $('#last_name').val() + '</h1><p>' + $('#description').val() +'</p></li>');
        $('form input').val("");
        $('form textarea').val("");
        return false;
    });
    $(document).on('click','li',function(){
        $(this).children().toggle();
    })
});
