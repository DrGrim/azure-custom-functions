var Tracker ;
var StartDate ;
var TSpent = "";
var StartClicked = false;

$( document ).ready(function() {

	$('input[aria-label="Time Spent"]').attr('disabled','disabled');
	$('input[aria-label="Time Spent"]').parent().append("<div id=\"trackbtn\" style=\"color:#fff;background-color:green;position: absolute;top: 0px;right: 0px;padding: 3px 5px 3px 5px;text-align: center;font-weight: bold;cursor:pointer;\"> START </div>");

	$('#trackbtn').click(function(){ 
	 
		 if(StartClicked == false){
			 
			    StartClicked = true;
			    if($('#trackbtn').html().indexOf('START') > -1  ){

				 if(StartDate == null){

				      setCookie($('span[aria-label="ID Field"]').html());
				      $('.work-item-form-title > div > div > input').val($('.work-item-form-title > div > div > input').val() + " ("+ $('#mectrl_currentAccount_primary').html()  +" WIP)").change();
				      setTimeout(function(){ $('.bowtie-save').parent().click(); }, 1000);

				}
				Start();

			    }else{

				      deleteCookie($('span[aria-label="ID Field"]').html());
				      $('.work-item-form-title > div > div > input').val(function(i, v) {return v.replace(" ("+ $('#mectrl_currentAccount_primary').html()  +" WIP)","");}).change();
				      setTimeout(function(){ OptionalNote(); }, 1000);
				      Stop();

			    }
		  }
		 setTimeout(function(){ StartClicked = false; }, 4000);
	});

	$('body').on('keypress', '#speshalnote', function(){

	     	var key = window.event.keyCode;
	     	if (key === 13 && $('#speshalnote').val().length == 0) {

			//post comment here with just the time spent
			SubmitNote("");
			$('#optionalNote').remove();

	        }

	});
	
	$('body').on('click', '#submitNote', function(){

	      //post comment here with just the time spent
	      SubmitNote($('#speshalnote').val().replace(/\n/g, '<br>\n').replace(/ /g, '\u00a0'));
	      $('#optionalNote').remove();

	});
        
	function SubmitNote(note){
	   
	      $('div[aria-label="Discussion"]').append('<div>'+note+'</div>').append('<div id="timepsenthistory" style="font-weight:bold;width: fit-content;float: right;">Time spent : '+TSpent+'</div>').change();
	      setTimeout(function(){  $('.bowtie-save').parent().click();   setTimeout(function(){  location.reload(); }, 500); }, 400);
	      TSpent = "";
	     
	
	}
	
	function Start(){

		TSpent = "";
		$('input[aria-label="Time Spent"]').parent().append("<div id=\"timer\" style=\"font-size:11px;color:green;font-weight:bold;position:absolute;top: 3px;right: 50px;\"> 0 hour(s) : 0 minute(s) : 0 second(s) </div>");
		$('#trackbtn').html("STOP").css('background-color','red');
		Tracker = setInterval(duration, 1000);

	}
	
	function Stop(){

		 $('#trackbtn').html("START").css('background-color','green');
		 TSpent = $('#timer').html();
		 $('#timer').remove();
		 clearInterval(Tracker);
		

	}
	
	function OptionalNote(){

		$('body').append(' <div id="optionalNote" style="position:fixed;top:200px;left:45%;background-color:#fff;box-shadow: 0px 0px 5px black;width:auto;height:auto;padding: 10px;"><div style="pointer-events: none;text-align:center;">Any notes to add ?</div><div style="margin-top:10px;"><textarea id="speshalnote" style="margin: 0px; width: 429px; height: 149px;"></textarea><br><button value="Submit Note" id="submitNote" style="float: right;border: none;background-color: #0077d4;color: #fff;padding: 5px;font-size: 12px;cursor:pointer;">Submit Note</button></div>  </div>  ');
		setDraggable('#optionalNote');
		setTimeout(function(){ $('#speshalnote').focus(); }, 1000);

	}

	function setCookie(itemid) {

		var d = new Date();
		StartDate = d.getTime();
		d.setTime(d.getTime() + (3600 * 1000 * 24 * 365 * 10));
		var expires = "expires="+ d.toUTCString();
 
		document.cookie = itemid + "=" + StartDate + ">" + $('input[aria-label="Time Spent"]').val().replace(" hour(s) ","").replace(" minute(s) ","").replace(" second(s) ","") + ";" + expires + ";path=/";

	}

	function deleteCookie(itemid) {

		document.cookie = itemid + "=" + StartDate + ">" + $('input[aria-label="Time Spent"]').val().replace(" hour(s) ","").replace(" minute(s) ","").replace(" second(s) ","") + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		StartDate = null;

	}

	function CheckForStartCookie(itemid){

	     if(document.cookie.indexOf(itemid+"=") >= 0){

		/*==========================Cookie===========================*/
		//read cookie string
		console.log( document.cookie );
		var Cookie = document.cookie.split(';');
		//get the value
		var TargetValue = Cookie[1].split('=');
		//convert miliseconds to an actual date
		var StampedFullDate = new Date( parseInt(TargetValue[1])).getTime();
		StartDate = new Date(StampedFullDate);

		$('#trackbtn').click();

	     }

	}
	
        //this function is not complete 	
        function duration() {


		var d = new Date();
		// get total seconds between the times
		var delta = Math.abs(StartDate - d) / 1000;

		// calculate (and subtract) whole days
		var days = Math.floor(delta / 86400);
		delta -= days * 86400;

		// calculate (and subtract) whole hours
		var hr = Math.floor(delta / 3600) % 24;
		delta -= hr * 3600;

		// calculate (and subtract) whole minutes
		var min = Math.floor(delta / 60) % 60;
		delta -= min * 60;

		// what's left is seconds
		var sec = delta % 60;  // in theory the modulus is not required

		$('#timer').html(hr+' hour(s) : '+min+' minute(s) : '+sec.toFixed(0)+' second(s)');
        }
	
       CheckForStartCookie($('span[aria-label="ID Field"]').html());

	
//=============================================================FORM DRAG AND DROP
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var container = document.querySelector("body");

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

var dragItem ;

	function setDraggable(item){

	     dragItem = document.querySelector(item);

	}

	function dragStart(e) {
	      if (e.type === "touchstart") {
		initialX = e.touches[0].clientX - xOffset;
		initialY = e.touches[0].clientY - yOffset;
	      } else {
		initialX = e.clientX - xOffset;
		initialY = e.clientY - yOffset;
	      }

	      if (e.target === dragItem) {
		active = true;
	      }
	}

	function dragEnd(e) {
	      initialX = currentX;
	      initialY = currentY;

	      active = false;
	}

	function drag(e) {
	      if (active) {

		e.preventDefault();

		if (e.type === "touchmove") {
		  currentX = e.touches[0].clientX - initialX;
		  currentY = e.touches[0].clientY - initialY;
		} else {
		  currentX = e.clientX - initialX;
		  currentY = e.clientY - initialY;
		}

		xOffset = currentX;
		yOffset = currentY;

		setTranslate(currentX, currentY, dragItem);
	      }
	}

	function setTranslate(xPos, yPos, el) {
	      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
	}

});


