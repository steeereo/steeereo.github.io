$(document).ready(function(){
	
    $("#homebutton").click(function(){
        $("div.temp").remove();
        $("#home").show();
        $("#overview").hide();
        $("#add").hide();
<<<<<<< HEAD
		$("#abcd div.butlist, #abcd br").show();
=======
		$("#abcd button, #abcd br").show();
>>>>>>> gh-pages
    });
	
    $("#overviewbutton").click(function(){															// click on 2nd screen - the graph
        $("div.temp").remove();
        $("#home").hide();
        $("#overview").show();
        $("#add").hide();
<<<<<<< HEAD
		$("#abcd div.butlist, #abcd br").show();
=======
		$("#abcd button, #abcd br").show();
>>>>>>> gh-pages
    });
	
    $("#addbutton").click(function(){																// click on the 3rd screen - the food list
        $("#home").hide();
        $("#overview").hide();
        $("#add").show();
		$("input#inp").focus();
		$("input#inp").val("");
    });
	
    $("input#inp").keyup(function(){																// search function
		var search = $(this).val();
<<<<<<< HEAD
        $("#abcd div.butlist").each(function(){
=======
        $("#abcd button").each(function(){
>>>>>>> gh-pages
			var val = $(this).val().toLowerCase();
			if ( val.indexOf(search.toLowerCase()) < 0 ) {
				$(this).hide();
				$("br#"+$(this).attr("id")).hide();
			} else {
				$(this).show();
				$("br#"+$(this).attr("id")).show();
			}
		});
    });
	
});

