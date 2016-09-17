$(document).ready(function(){
    $('#click-btn').click(function(){
        console.log("Click-test...");
        $('#click-test').text('It seems to have worked!');
    });
    $("input").focus(function(){
        console.log("Focusing in");
        $(this).next("span").css("display","inline");
    });
    console.log("Painting the world");
    $("span").addClass("colorme");

    console.log("Fetching value");
    $("select").change(function(){
        var singlevalue = $("#testvalues").val();
        $("#displayval").html(singlevalue);
    });
    $("#displayval").html($("#testvalues").val());

    console.log("Fetching data");
    $("#printattr").text("The default color is:" + $("option").attr("value"));

    console.log("Adding data");
    $("span").data("foo","we are searching for a color");
    console.log($("span").data("foo"));

    $('#addbefore').click(function(){
        console.log("Adding data before the middle");
        $("#beforeaftertest").before("<p>This is the beginning.</p>");
    });

    $('#addafter').click(function(){
        console.log("Adding data after the middle");
        $("#beforeaftertest").after("<p>This is the end.</p>");
    });
    $('#appenddata').click(function(){
        console.log("Appending data");
        $("#beforeaftertest").append("<p>This is after the middle and before the end.</p>");
    })
    $('#hidestuff').click(function(){
        console.log("Hiding some stuff");
        $("#showandtell").hide("slow");
    });
    $('#showstuff').click(function(){
        console.log("Showing that hidden stuff");
        $("#showandtell").show("fast");
    })
    $("#togglestuff").click(function(){
        console.log("toggle toggle toggle");
        $("#showandtell").toggle();
    })
    $("#fadein").click(function(){
        console.log("Fade in");
        $("#showandtell").fadeIn("slow");
    });
    $("#fadeout").click(function(){
        console.log("Fade Out");
        $("#showandtell").fadeOut("slow");
    });
    $("#slideup").click(function(){
        console.log("slide up");
        $("#slide").slideUp("slow");
    });
    $("#slidedown").click(function(){
        console.log("Slide down");
        $("#slide").slideDown("slow");
    });
    $("#slidetoggle").click(function(){
        console.log("Toggle slide");
        $("#slide").slideToggle("slow");
    });
});
