$(document).ready(function(){
    console.log("jquery loaded");
    $('form').submit(function(){
        console.log("form submission");
        $('tbody').append('<tr><td>' + $('#first_name').val() + '</td><td>' + $('#last_name').val() + '</td><td>' + $('#email_address').val() + '</td><td>' + $('#phone').val());
        $('input[type=text]').val("");
        return false;
    });
});
