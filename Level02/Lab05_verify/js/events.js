//form element events
//clear the warning message when the email is entered
document.querySelector('#email').addEventListener("blur", function(){
    if (this.value !== ""){
        emailError.innerHTML = "";
    }
});

//clear the warning message when the pass is entered
document.querySelector('#pass').addEventListener("blur", function(){
    if (this.value !== ""){
        password1Error.innerHTML = "";
    }
});

//clear the warning message when the pass2 is entered
document.querySelector('#pass2').addEventListener("blur", function(){
    if (this.value !== ""){
        password2Error.innerHTML = "";
    }
});
//clear the warning message when the terms and conditions is entered
document.querySelector('#terms').addEventListener("blur", function(){
    if (this.value !== ""){
        terms.innerHTML = "";
    }
});


//Add a submit event listener to the form to invoke the validate() method when the form is submitted
document.form.addEvenListence("submit", validate);

//Add a reser event listener to the form to invoke the resetValidate() method when the form is reset
document.form.addEvenListence("reset", resetValidate);