var Hours   = 0 ;
var Minutes = 0 ;
var Seconds = 0 ;
var Tracker ;

$('input[aria-label="Time Spent"]').parent().append("<div id=\"trackbtn\" style=\"color:#fff;background-color:green;position: absolute;top: 0px;right: 0px;padding: 3px 5px 3px 5px;text-align: center;font-weight: bold;cursor:pointer;\"> START </div>").click(function(){

        if($('#trackbtn').html().indexOf('START') > -1){
                
                $('input[aria-label="Time Spent"]').parent().append("<div id=\"timer\" style=\"color:green;font-weight:bold;position:absolute;top: 0px;right: 50px;\"> 0 hour(s) : 0 minute(s) : 0 second(s) </div>");
                $('#trackbtn').html("STOP").css('background-color','red');
		Tracker = setInterval(StartTracking, 1000);

        }else{

                $('#trackbtn').html("START").css('background-color','green');
                clearInterval(Tracker);
                Hours = 0;
                Minutes = 0;
                Seconds = 0;
                $('#timer').remove();
                
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
