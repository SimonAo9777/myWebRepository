//Lab6 javacript:to work with JavaScript directly to add functionality to the calculator.
//references
//Reference to the professor's courseware materials method
//Professor lab's tutoring
//Learn from classmates
//https://www.w3schools.com/jsref/jsref_regexp_not_0-9.asp

window.onload=function claculate(){
   
    //Obtain the elements of the html file thtough the equation
    var inresult = document.getElementsByName("equation");
    
    //Obtain the button elements of the html file thtough the equation
    var rowbon = document.querySelectorAll(".btn");

    //Import the calculator's input rules to determine whether the input method is valid.
    var reg = /^[0-9]*\.?[0-9]*([\+\-|*|\/][0-9]*\.?[0-9]+)*$/;
    

   /* get every items in the array numbers*/ 
    rowbon.forEach(function(event){
        
            /* function for clicking each button of the calculator*/ 
            event.addEventListener("click",function(){

                /* Clear the input box if button "C" is clicked*/ 
                if(event.value == "C"){
                    inresult[0].value = "";

                /* Get result if button "=" is clicked*/ 
                }else if(event.value == "="){
                    event.type = "button";
                    /* return the result if the equation complies with the rule */ 
                    if(reg.test(inresult[0].value)){
                        inresult[0].value = eval(inresult[0].value);
                    }
                     /* return error message if the equation doesn't comply with the rule */ 
                    else{
                        inresult[0].value = "Error";
                    } 

                /* replace error message with number or operator that is clicked */ 
                }else if(inresult[0].value == "Error"){
                    inresult[0].value = event.value;
                }

                /* numbers or operator show in the input box */ 
                else{ 
                    inresult[0].value +=  event.value ; 
                    }
                },false)    
     });

}