$(document).ready(function(){
	
    $("#homebutton").click(function(){
        $("div.temp").remove();
        $("#home").show();
        $("#overview").hide();
        $("#add").hide();
		$("#abcd button, #abcd br").show();
    });
	
    $("#overviewbutton").click(function(){															// click on 2nd screen - the graph
        $("div.temp").remove();
        $("#home").hide();
        $("#overview").show();
        $("#add").hide();
		$("#abcd button, #abcd br").show();
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
        $("#abcd button").each(function(){
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

