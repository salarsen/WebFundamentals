$(document).ready(function(){
    $('form').submit(function(){
        var date1 = $("#datepicker1").val();
        var date2 = $("#datepicker2").val();
        var phone = $("#phonenum").val();
        var name = $("#name").val();
        var form_complete = true;
        $("input[type=text]").siblings("span").html("");
        if(date1 == ""){
            $('#datepicker1').siblings("span").html('Date not set, try again.');
            form_complete = false;
        }
        if(date2 == ""){
            $('#datepicker2').siblings("span").html("Date not set, try again.");
            form_complete = false;
        }
        if(phone == ""){
            $('#phonenum').siblings("span").html("Phone number not set, try again");
            form_complete = false;
        }
        if(name == ""){
            $('#name').siblings("span").html("You can't travel without a name!");
            form_complete = false;
        }
        if(form_complete){
            alert("Congrats! You have booked a flight from " + date1 + " to " + date2 + " for " + name + " (" + phone + ").");
            $("input[type=text]").val("");
        }
        return false;
    });
});
$(function(){
    $("#datepicker1").datepicker();
    $("#datepicker2").datepicker();
})
