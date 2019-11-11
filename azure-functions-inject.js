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
                 
			/*==========================Cookie===========================*/
			//read cookie string
			var Cookie = document.cookie.split(';');
			//get the value
			var TargetValue = Cookie[1].split('=');
			//convert miliseconds to an actual date
			var StampedFullDate = new Date( parseInt(TargetValue[1])).getTime();
			var date = new Date(StampedFullDate);
			console.log(StampedFullDate);
			/*==========================Get Time Difference===============*/
			date_past = new Date(parseInt(TargetValue[1]));

		    //console.log(date.toString());
			duration(date);

		}

	}
	
    //this function is not complete 	
    function duration(startDate) {


        var d = new Date();
        // get total seconds between the times
        var delta = Math.abs(startDate - d) / 1000;

        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        var hr = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        var min = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        var sec = delta % 60;  // in theory the modulus is not required

         alert(hr+ ":"+min+":"+sec);
    }
});


