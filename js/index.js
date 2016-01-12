$(function(){
  var $ppc = $('.progress-pie-chart'),
    percent = parseInt($ppc.data('percent')),
    deg = 360*percent/100;
  if (percent > 50) {
    $ppc.addClass('gt-50');
  }
  $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
  $('.ppc-percents span').html(percent+'%');
});


$(document).ready(function(){
    $("#overviewbutton").click(function(){
        $("#home").hide();
        $("#overview").show();
        $("#add").hide();
    });
    $("#homebutton").click(function(){
        $("#home").show();
        $("#overview").hide();
        $("#add").hide();
    });
    $("#addbutton").click(function(){
        $("#add").show();
        $("#overview").hide();
        $("#home").hide();
    });
});

