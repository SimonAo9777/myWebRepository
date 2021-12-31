/* Set Weekly Kitten Pictures Subscription froms conditions*/
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;		
var emailError = document.querySelector('#emailError');
var password1Error = document.querySelector('#password1Error');
var password2Error = document.querySelector('#password2Error');
var formcheckError = document.querySelector('#formcheckError');

function resetValidate(e){
	emailError.innerHTML = '';
	password1Error.innerHTML = '';
	password2Error.innerHTML = '';
	formcheckError.innerHTML = '';
}

function  validate(e){
    var valid = true;

    //display warning if email is not match mailformat
	if(form.email.value != form.email.value.match(mailformat)){
		emailError.innerHTML = 'Please enter a valid Email Address';
		valid = false;
	}

      //display warning if email is not entered
	if(form.email.value === "" ){
		emailError.innerHTML = 'Email Address cannot be empty';
		valid = false;       
	}
   

   //display warning if password is not entered
	if(form.pass.value === ""){
    password1Error.innerHTML = 'Password cannot be empty';
    valid = false;
    }
   
    //display warning if tow password is not match
	if(form.pass.value != form.pass2.value){
		password2Error.innerHTML = 'The two password not match';
		valid = false;
	}
    //display warning if password is not entered
	if(form.pass2.value === ""){
		password2Error.innerHTML = 'Re-Type Password number cannot be empty';
		valid = false;
	}

    //display warning if not agree to the terms and conditions
    if(form.terms.value === "" || !terms.checked){
        formcheckError.innerHTML = 'Please agree to the terms and conditions';
        valid = false;
    }  
    if(!valid){
		// Then we prevent the form from being submitted/sent by canceling the event
		event.preventDefault();
	}
    
   return valid;
}


