var Tracker ;
var StartDate ;

$( document ).ready(function() {

 $('input[aria-label="Time Spent"]').parent().append("<div id=\"trackbtn\" style=\"color:#fff;background-color:green;position: absolute;top: 0px;right: 0px;padding: 3px 5px 3px 5px;text-align: center;font-weight: bold;cursor:pointer;\"> START </div>").click(function(){
  
		if($('#trackbtn').html().indexOf('START') > -1  ){
                       
			if(StartDate == null){
		       
		          setCookie($('span[aria-label="ID Field"]').html());
			       
		       }
			Start();

		}else{
			
			deleteCookie($('span[aria-label="ID Field"]').html());
			Stop();

		}

 });

function Start(){
	
	$('input[aria-label="Time Spent"]').parent().append("<div id=\"timer\" style=\"color:green;font-weight:bold;position:absolute;top: 0px;right: 50px;\"> 0 hour(s) : 0 minute(s) : 0 second(s) </div>");
	$('#trackbtn').html("STOP").css('background-color','red');
	Tracker = setInterval(duration, 1000);
	
}
	
function Stop(){

	 $('#trackbtn').html("START").css('background-color','green');
	 $('#timer').remove();
	 clearInterval(Tracker);
	
}

 function setCookie(itemid) {

	  var d = new Date();
	  StartDate = d.getTime();
	  d.setTime(d.getTime() + (3600 * 1000 * 24 * 365 * 10));
	  var expires = "expires="+ d.toUTCString();

	  document.cookie = itemid + "=" + StartDate + ";" + expires + ";path=/";

 }

 function deleteCookie(itemid) {

	   document.cookie = itemid + "=" + StartDate + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

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
});


