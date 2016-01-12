 var food_items ={};
        var keys =[];
        var nr_food_items;

        $(document).ready(function () {
            load_foodItems();
        });

        function load_foodItems() {

          //  alert("load_foodItems");
            //test for firefox 3.6 see if it works
            //with this way of iterating it
            nr_food_items = parseInt(localStorage.getItem("$fap_nofis$"));
            for (var i = 1, len = nr_food_items; i < len; i++) {
                var key = "$fap_fi" + (i).toString() + "$";
              //  console.log(key);
                var item = JSON.parse(localStorage.getItem(key));
                food_items[item[0]] = [item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]];
                //food_items[item[0]] = item[8];
              keys.push(item[0]);
                $("<button>" + item[0] + " " + item[1] + " " + item[8] + " " + item[9] + "</button></br>")
                    .val(item[0]).attr('class', 'butlist').attr('id', 'nnn' + i).appendTo('#abcd').click(function () {
                        button_selected($(this));
                    });

            }

        }

// Funktion Button selected
var calories =0;

            function button_selected(x) {
                alert(x.text() + " hinzugefügt");
                $("<p>" + x.val() + " " +food_items[x.val()][7] + " kcal" + "</p>").appendTo('#mealsDiv');
                calories = calories + parseInt(food_items[x.val()][7]);
             $('#calorieSum').text(calories.toString() + " kcal");
            
                // actualize char data
            var nr_wkci_items = localStorage.getItem('$fap_nowkcis$');
            var key = "$fap_wkci" + (nr_wkci_items).toString() + "$";
	        var item = JSON.parse(localStorage.getItem(key));
                d=new Date();
                today=new Date(d.getFullYear(),d.getMonth(),d.getDate());
                today_new=JSON.parse(JSON.stringify(today));
                alert(item['date'] + '  '  + today_new);
                if(item['date'] == today_new) {
                    alert('heuties Datum gefundne');
                    item['volume'] += food_items[x.val()[7]];
                    alert('item gefunden');
                } 
                else{
                    key = "$fap_wkci" + (parseInt(nr_wkci_items)+1).toString() + "$"; 
                    localStorage.setItem('$fap_nowkcis$',JSON.stringify(parseInt(nr_wkci_items)+1));
                    alert(key);
                    chartData_new = {
                        date: today,
                        value: 80,
                        volume: parseInt(food_items[x.val()][7])
                    };
                    localStorage.setItem(key, JSON.stringify(chartData_new));
                    generateChartData();
	    createStockChart();
                };
            };

// Funktion scroll list to entered letter
        
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
        });