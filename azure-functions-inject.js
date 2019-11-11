var Hours   = 0 ;
var Minutes = 0 ;
var Seconds = 0 ;
var Tracker ;

$( document ).ready(function() {

	CheckForStartCookie($('span[aria-label="ID Field"]').html());


	$('input[aria-label="Time Spent"]').parent().append("<div id=\"trackbtn\" style=\"color:#fff;background-color:green;position: absolute;top: 0px;right: 0px;padding: 3px 5px 3px 5px;text-align: center;font-weight: bold;cursor:pointer;\"> START </div>").click(function(){

		if($('#trackbtn').html().indexOf('START') > -1){

			$('input[aria-label="Time Spent"]').parent().append("<div id=\"timer\" style=\"color:green;font-weight:bold;position:absolute;top: 0px;right: 50px;\"> 0 hour(s) : 0 minute(s) : 0 second(s) </div>");
			$('#trackbtn').html("STOP").css('background-color','red');
			Tracker = setInterval(StartTracking, 1000);
			setCookie($('span[aria-label="ID Field"]').html());

		}else{

			$('#trackbtn').html("START").css('background-color','green');
			clearInterval(Tracker);
			Hours = 0;
			Minutes = 0;
			Seconds = 0;
			$('#timer').remove();
			deleteCookie($('span[aria-label="ID Field"]').html());

		}

	});

	function StartTracking(){

			  //seconds progression 
			  if(Seconds < 59){

			      Seconds++;

			  }else{

			       Seconds = 0;
			       Minutes++;

			  }

			  if(Minutes > 59){

			      Minutes = 0;
			      Hours++;

			  }

			  $('#timer').html(Hours+' hour(s) : '+Minutes+' minute(s) : '+Seconds+' second(s)');  
	}

	function setCookie(itemid) {

	  var d = new Date();
	  var WhenDidItStart = d.getTime();
	  d.setTime(d.getTime() + (3600 * 1000 * 24 * 365 * 10));
	  var expires = "expires="+ d.toUTCString();

	  document.cookie = itemid + "=" + WhenDidItStart + ";" + expires + ";path=/";

	}

	function deleteCookie(itemid) {

	   document.cookie = "username="+itemid+"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

	}

	function CheckForStartCookie(itemid){

		if(document.cookie.indexOf(itemid+"=") >= 0){
                 
			var Cookie = document.cookie.split(';');
			var TargetValue = Cookie[1].split('=');
		        console.log(TargetValue[1]);

		}

	}
	
});


