var food_items ={};
var keys =[];
var nr_food_items;

$(document).ready(function () {
	UpdateDiagram();
	DrawTheBarChard();
    load_foodItems();
});

function load_foodItems() {

  //  alert("load_foodItems");
    //test for firefox 3.6 see if it works
    //with this way of iterating it
	
	
	var plusminus1  = '<div class="adjust">';
		plusminus1 += '<span class="minus buttons"></span>';
		plusminus1 += '<span class="total"><span class="number">100</span><span class="unit">';
	var plusminus2  = '</span></span>';
		plusminus2 += '<span class="plus buttons"></span>';
		plusminus2 += '</div>';
	
	$("body").on("click", ".my_remove .remove_button", function(){
		
		var to_remove = parseInt( $(this).closest(".butlist").find(".kcal").html());
		
		console.log("Remove is clicked, remove = " + to_remove + "kcal" );
		
		calories = calories - to_remove;
		
		$('#calorieSum')	.text(calories.toString() + " kcal")
							.attr("data-cal", calories);
		UpdateDiagram();
		DrawTheBarChard();
		
		$(this).closest(".butlist").remove();
		
	});
	
	$("body").on("click", ".adjust .minus", function(){
		
		console.log("Minus is clicked, total = " + parseInt($(this).parent().find(".total .number").html()) );
		
		var total = parseInt($(this).parent().find(".total .number").html());
			total = total - 50 <= 0 ? total : total - 50;
			
		$(this).parent().find(".total .number").html(total);
		
	});
	
	$("body").on("click", ".adjust .plus", function(){
		
		console.log("Plus is clicked, total = " + parseInt($(this).parent().find(".total .number").html()) );
		
		var total = parseInt($(this).parent().find(".total .number").html());
			total = total + 50;
			
		$(this).parent().find(".total .number").html(total);
		
	});
	
	
    nr_food_items = parseInt(localStorage.getItem("$fap_nofis$"));
    for (var i = 1, len = nr_food_items; i < len; i++) {
        var key = "$fap_fi" + (i).toString() + "$";
      //  console.log(key);
        var item = JSON.parse(localStorage.getItem(key));
		if ( item[11] ) {
			use_image = item[11];
		} else {
			use_image = "circle.png";
		}
        food_items[item[0]] = [item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]];
        //food_items[item[0]] = item[8];
		keys.push(item[0]);
		var element_to_insert  = '<div><img src="food_images/'+use_image+'" /> ';
			element_to_insert += '<span style="font-weight:bold;">';
			element_to_insert += item[0];//						the name		(Aal)
			element_to_insert += "</span> ";
			element_to_insert += '<span class="quantity" data-quantity="100">100</span>';
			element_to_insert += '<span class="unit">';
			element_to_insert += item[1].substr(3);//			the quantity	(100+g)
			element_to_insert += "</span> ";
			element_to_insert += "<br/>";
			element_to_insert += '<span class="kcal" data-kcal="'+item[8]+'">';
			element_to_insert += item[8];//						the kcal		(263)
			element_to_insert += "</span> ";
			element_to_insert += item[9];//						the kcal unit	(kcal)
			element_to_insert += plusminus1 + item[1].substr(3) + plusminus2;
			element_to_insert += "</div>";
        $(element_to_insert)
            .val(item[0])
			.attr('class', 'butlist')
			.attr('id', 'nnn' + i)
			.appendTo('#abcd')
/*			.on("click",function(){
				console.log("Item clicked");
                button_selected($(this))
            })*/
			.on("swiperight",function(){
				console.log("Item swiped (right)");
                button_selected($(this));
            });

    }
}
		
// Draw the chart
function DrawTheBarChard(){
	
	$("#chartdiv").html("");

	var total_cal 	= parseInt( $('#calorieSum').attr("data-cal") );

	if( total_cal >= 2000 ) {
		var data_array = [
			{ y: 'Monday', a: 2000, b: 350 },
			{ y: 'Tuesday', a: 1800 },
			{ y: 'Wednesday', a: 2000,  b: 200 },
			{ y: 'Thursday', a: 1850 },
			{ y: 'Friday', a: 1950 },
			{ y: 'Saturday', a: 2000,  b: 150 },
			{ y: 'Sunday', a: 2000, b: total_cal - 2000 }
		  ]
	} else {
		var temp_nmbr  = (total_cal == 0) ? 10 : total_cal ,
			data_array = [
			{ y: 'Monday', a: 2000, b: 350 },
			{ y: 'Tuesday', a: 1800 },
			{ y: 'Wednesday', a: 2000,  b: 200 },
			{ y: 'Thursday', a: 1850 },
			{ y: 'Friday', a: 1950 },
			{ y: 'Saturday', a: 2000,  b: 150 },
			{ y: 'Sunday', a: temp_nmbr }
		  ]
		//12300 + total_cal = week cal
	}
	if (total_cal > 1700) {
		var word = "over",
			color = "#d9534f", //red
			difference = total_cal - 1700;
	} else {
		var word = "under",
			color = "#5cb85c", //green
			difference = 1700 - total_cal;
	}
	
//	$("#overview #text_message").html('<div style="padding:40px;text-align:center;">I am <span style="color: ' + color + ';">' + difference + '</span> calories ' + word + ' the budget for the week.</div>');
	$("#overview #text_message").html('<div style="padding:40px;text-align:center;">Sie können heute noch <span style="color: ' + color + ';">' + difference + '</span> kcal zu sich nehmen.</div>');

	Morris.Bar({
	  element: 'chartdiv',
	  data: data_array,
	  barColors: [ "#5cb85c", "#d9534f"], // green, red
	  xkey: 'y',
	  stacked: true,
	  hideHover: true,
	  resize: true,
	  axes: false,
	  grid: false,
	  ykeys: ['a', 'b'],
	  labels: ['Recommended', 'Overflow']
	});

}
		
// Update the progress circle
function UpdateDiagram(){
/*	
  var $ppc = $('.progress-pie-chart'),
    percent = parseInt($ppc.data('percent')),
    deg = 360*percent/100;
  if (percent > 50) {
    $ppc.addClass('gt-50');
  }
*/
	var max_cal		= 2000,
		total_cal 	= parseInt( $('#calorieSum').attr("data-cal") ),
		percent 	= parseInt( total_cal / max_cal * 100),
		deg 		= 360 * percent / 100;
	if (percent > 100) {
		$('.progress-pie-chart').css("background-color", "red");
		$('.ppc-progress-fill').css('transform','rotate(0deg)');
		$('.ppc-percents span').html(percent+'%').css("color", "red");
	} else {
		$('.progress-pie-chart').css("background-color", "#E5E5E5");
		$('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
		$('.ppc-percents span').html(percent+'%').css("color", "white");
		if (percent > 50) {
			$('.progress-pie-chart').css("background-color", "#51c4d4");
			$('.progress-pie-chart').addClass('gt-50');
		} 
	}
}

// Function Button selected
var calories =0;

function button_selected(x) {
    //alert(x.text() + " hinzugefügt");
    //$("<p>" + x.val() + " " +food_items[x.val()][7] + " kcal" + "</p>").appendTo('#mealsDiv');
	
	var remove_button  = '<span class="remove_button"></span>';
	
    var $y = x.clone();
	
	var temp_quantity 	= parseInt( $y.find(".adjust .total .number").html() ),
		temp_factor		= temp_quantity / 100,
		temp_kcal		= parseInt( parseInt( $y.find(".kcal").html() ) * temp_factor );
		
	$y.find(".quantity").html( temp_quantity );
	$y.find(".kcal").html( temp_kcal );
	$y.find(".adjust").toggleClass("my_remove adjust").html( remove_button );
	
	$y.appendTo('#mealsDiv');
	
    calories = calories + parseInt( food_items[x.val()][7] * temp_factor );
	
	$('#calorieSum')	.text(calories.toString() + " kcal")
						.attr("data-cal", calories);
	UpdateDiagram();
	DrawTheBarChard();
	
	x	.css("position", "relative")
		.css("left", "0");
	var offset = x.offset();
	var height = x.outerHeight();
	var temp = $('<div><div class="arrow"/></div>')	.appendTo("body")
							.attr("id", x.attr("id"))
							.addClass("temp")
							.css("height", height)
							.css("top", offset.top+"px");
	x.animate({
		left: "100vw"
	}, 500, function() {
		window.setTimeout( function(){
			
			x.find(".adjust .total .number").html("100");
			
			x.animate({
				left: "0"
			}, 500);
		}, 1000);
	});
	temp.animate({
		left: "0"
	}, 500, function() {
		temp.find(".arrow").animate({top: "4vh"}, 500);
		window.setTimeout( function(){
			temp.animate({
				left: "-100vw"
			}, 500, function() {
				temp.remove();
			});
		}, 1000);
	});
            
			
/*			
                // actualize char data
            var nr_wkci_items = localStorage.getItem('$fap_nowkcis$');
            var key = "$fap_wkci" + (nr_wkci_items).toString() + "$";
	        var item = JSON.parse(localStorage.getItem(key));
                d=new Date();
                today=new Date(d.getFullYear(),d.getMonth(),d.getDate());
                today_new=JSON.parse(JSON.stringify(today));
                if(item['date'] == today_new) {
                    item['volume'] += food_items[x.val()[7]];
                } 
                else {
                    key = "$fap_wkci" + (parseInt(nr_wkci_items)+1).toString() + "$"; 
                    localStorage.setItem('$fap_nowkcis$',JSON.stringify(parseInt(nr_wkci_items)+1));
                    //alert(key);
                    chartData_new = {
                        date: today,
                        value: 80,
                        volume: parseInt(food_items[x.val()][7])
                    };
                    localStorage.setItem(key, JSON.stringify(chartData_new));
                    generateChartData();
					createStockChart();
                };
*/
            };

// Function scroll list to entered letter
/*        
        $("#inp").keyup(function(){
        var value = $( this ).val();
          //vx='-'+value+'-';

          //alert(vx);
          //alert(String.fromCharCode(e.which));
          for(var i=0; i<nr_food_items; i++){
            var n = keys[i].indexOf(value);
            //alert(keys[i]);
            if(n == 0){
              var hight = $("#abcd").prop('scrollHeight');
              var pos = Math.floor(hight / nr_food_items * i);
              //alert(pos);
              //alert(keys[i]);
              //alert(i);
              $( "#abcd" ).scrollTop(pos);
              return;
            }
            //alert(keys[nritems-1]);

         }
        });*/ //