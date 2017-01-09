/* todo
	
	// iconen op tiles//
	// start-einde vormgeven //
	// inner glow op tiles? //
	// vormgeving title //
	// hue aanpassen //
	// naam op muntje //
	// title fix font-size //
	// validation van 2 spelers //
	// bord of vragen - ook in settings //
	// overzetten naar 32s.nl //
	// ander vormig bord //
	// vormgeving vragen //
	// woorden checken //
	// uitleg van spel //
	// meer tutorial achtige shizzle //
	// hoogte check voor mobile e.d. responsiveness //
	// Woorden toevoegen //
*/


$(document).ready(function(){
	init();

	if (isIE () > 9 || isIE () == false) {
	
		$('.inputoverlay td:nth-child(2)').each(function(){
			$(this).removeClass('hidden');
		});	
		
	} 

	$('.player1').css({'-webkit-filter':'hue-rotate(90deg)','filter':'hue-rotate(90deg)'});
		$('.player2').css({'-webkit-filter':'hue-rotate(180deg)','filter':'hue-rotate(180deg)'});
		$('.player3').css({'-webkit-filter':'hue-rotate(270deg)','filter':'hue-rotate(270deg)'});
		$('.player4').css({'-webkit-filter':'hue-rotate(0deg)','filter':'hue-rotate(0deg)'});
		
	$(".my_audio").trigger('load');


	$('.randomNumber img').click(function(){
		var shuffle = 10;
		$(".roll_audio").trigger('play');
		var interval = setInterval(function(){
			
			if (shuffle>0)
			{
				var randomNumber = Math.floor((Math.random() * 3)); 
				$('.randomNumber img').attr("src", "images/dice"+randomNumber+".png");
				shuffle--;
			} else {
				clearInterval(interval);
			}
		}, 60);
			
		
	});


	$('body').on( "click", ".inputOverlay .submitBtn", function() {
		if(!$('.submitBtn').hasClass('inactive')) {
			$('.inputOverlay').addClass('hidden');
			$('.overlay').addClass('hidden');
			/* verbeteren */
			if($('.namePlayer1').val() == "") {
				$('.boardContainer > .player1').addClass('hidden');
			} else {
				$('.boardContainer > .player1').removeClass('hidden');
			}
			if($('.namePlayer2').val() == "") {
				$('.boardContainer > .player2').addClass('hidden');
			} else {
				$('.boardContainer > .player2').removeClass('hidden');
			}
			if($('.namePlayer3').val() == "") {
				$('.boardContainer > .player3').addClass('hidden');
			} else {
				$('.boardContainer > .player3').removeClass('hidden');
			}
			if($('.namePlayer4').val() == "") {
				$('.boardContainer > .player4').addClass('hidden');
			} else {
				$('.boardContainer > .player4').removeClass('hidden');
			}
		}

	});

	$('body').on( "click", ".options", function() {
		$('.inputOverlay').removeClass('hidden');
		$('.overlay').removeClass('hidden');
	});

	$('body').on( "click", ".information", function() {
		$('.ExplanationOverlay').removeClass('hidden');
		$('.overlay2').removeClass('hidden');
	});


	$('.startCounter').click(function(){
		$('.counter').removeClass('hidden');
		$('.overlay').removeClass('hidden');
		clearInterval(interval);
	
		$(".my_start_audio").trigger('play');
		var timer = 30;
		$('.timeLeft').html(timer);
		var interval = setInterval(function(){
			if (timer>0)
			{
				timer--;
				$(".click_tick_audio").trigger('play');
				var tick = document.getElementById("clickTick");
				tick.volume = 0.2;

				$('.timeLeft').html(timer);
			} else {
				$(".my_end_audio").trigger('play');
				clearInterval(interval);
				
				var toggler = 20;
				var colorInterval = setInterval(function(){
				
					if(toggler > 0) {

							$('.counter').toggleClass( "red" );
						
						toggler--;
					} else {
						clearInterval(colorInterval);
						$('.counter').addClass('hidden');
						$('.overlay').addClass('hidden');
					}
				}, 50);
				
				
			}
				$('body').on( "click", ".counter .closeBtn", function() {
					clearInterval(interval);
					var timer = 30;
					$('.counter').addClass('hidden');
					$('.overlay').addClass('hidden');
				});
				
		}, 1000);
		
	});
	
	$('body').on( "click", ".ExplanationOverlay .closeBtn", function() {

		$('.ExplanationOverlay').addClass('hidden');
		$('.overlay2').addClass('hidden');
	});

	var boardhtml = "";
	
	var greenTiles = [1,3,9,14,18,20,21,25,27,40,41,47,54,58,60,61,63,69];
	var redTiles = [2,8,10,11,13,17,24,26,30,31,44,50,51,53,57,62,68,70];

	for(var x = 1; x<71; x++){

		boardhtml += '<div class="tile tile'+x;

		for(var y = 0; y<greenTiles.length; y++){
			if(x == greenTiles[y]) {
				boardhtml += ' green droppable';
			}
		}
		for(var y = 0; y<redTiles.length; y++){
			if(x == redTiles[y]) {
				boardhtml += ' red droppable';
			}
		}


		boardhtml += '"';

		boardhtml +=  '>';
		var imgurl = "bg"+ Math.floor(Math.random()*22)+".png";
		if(x != 44 && x != 47){
			boardhtml += '<img src="images/'+imgurl+'"/>';
		} else if (x==44)
		{
			boardhtml += '<div class="startEinde">START</div>';
		} else if (x==47)
		{
			boardhtml += '<div class="startEinde">EINDE</div>';
		}
		boardhtml += '</div>';
	}

	

	$('.board').html(boardhtml);


	$( ".draggable" ).draggable({ revert: "invalid" });
	$( ".droppable" ).droppable({ });

	$('.namePlayer1').focus();

	

});

function addName(playerNumber) {
	/*$('.nameInput').each(function(){
		if($(this).val()==""){
			 $(this).attr({
				'disabled': 'disabled'
			 });
		};
	});*/
	var amountPlayers = 0;
	$('.nameInput').each(function(){
		if($(this).val()!=""){
			amountPlayers++;
		}
	});
	if (amountPlayers>1)
	{
		$('.submitBtn').removeClass('inactive');
	} else {
		$('.submitBtn').addClass('inactive');
	}

	
	$('.namePlayer'+(playerNumber+1)).removeAttr('disabled');
	$('.colorPlayer'+(playerNumber+1)).removeAttr('disabled');

	var shortName = "";

	var namePlayer = $('.namePlayer'+playerNumber).val();
	var res = namePlayer.split(" ");
	for(i=0; i<=res.length && i<3;i++) {
		
		if (res[i])
		{		
			shortName += res[i][0];
		}
	}
	
	
	if(res.length == 1) 
	{
		$('.name'+playerNumber).addClass('letter1');
		$('.name'+playerNumber).removeClass('letter2');
		$('.name'+playerNumber).removeClass('letter3');
	} 	
	if(res.length == 2) 
	{
		$('.name'+playerNumber).addClass('letter2');
		$('.name'+playerNumber).removeClass('letter1');
		$('.name'+playerNumber).removeClass('letter3');
	} 
	if(res.length == 3) 
	{
		$('.name'+playerNumber).addClass('letter3');
		$('.name'+playerNumber).removeClass('letter1');
		$('.name'+playerNumber).removeClass('letter2');
	} 
	
	
	$('.name'+playerNumber).html(shortName); 

	
};

function changeColor(playerNumber) {
	var colorValue = $('.colorPlayer'+playerNumber).val();
	$('.player'+playerNumber).css({"-webkit-filter":"hue-rotate(180deg)", "filter":"hue-rotate("+colorValue+"deg)"}); 

}


var clickms = 100;
var lastTouchDown = -1;

function touchHandler(event) {
	var $target = $(event.target);  
	console.log($target);
	if( $target.hasClass('coin') ) { 
		
		var touch = event.changedTouches[0];
		
		var simulatedEvent = document.createEvent("MouseEvent");
			simulatedEvent.initMouseEvent({
			touchstart: "mousedown",
			touchmove: "mousemove",
			touchend: "mouseup"
		}[event.type], true, true, window, 1,
			touch.screenX, touch.screenY,
			touch.clientX, touch.clientY, false,
			false, false, false, 0, null);

		touch.target.dispatchEvent(simulatedEvent);
		event.preventDefault();
	};
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}