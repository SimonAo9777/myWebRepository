// generate the dynamic <option> for category, data from mysql
function loadCategory() {
    var categoryElement = document.querySelector('#category');
    for(var i=0; i<categories.length; i++) {
        categoryElement.options[i+1] = new Option(categories[i].header, categories[i].id); // categoryElement.options[0] is always <option value=""> -- Select one -- </option>
    }
}

// generate the dynamic <option> for subCategory, based on selected category
function loadSubCategory() {
    var categoryElement = document.querySelector('#category');
    var subCategoryElement = document.querySelector('#subCategory');
    for(let category of subCategories) {
        if(category.categoryId == categoryElement.value) { // find the matching category by categoryId
            for(var i=0; i<category.subCategories.length; i++) {
                subCategoryElement.options[i+1] = new Option(category.subCategories[i], category.subCategories[i]); // subCategoryElement.options[0] is always <option value=""> -- Select one -- </option>
            }
            break;
        }
    }
}

// add listener to erase error messages when the element loses focus
function addListenersEraseErr() {
    //clear the warning message when the category is entered
    document.querySelector('#category').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#categoryError').innerHTML = "";
        }
    });

    //clear the warning message when the subCategory is entered
    document.querySelector('#subCategory').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#subCategoryError').innerHTML = "";
        }
    });

    //clear the warning message when the name is entered
    document.querySelector('#name').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#nameError').innerHTML = "";
        }
    });

    //clear the warning message when the image is entered
    document.querySelector('#mainImage').onchange = function(e){
        if (this.value !== ""){
            document.querySelector('#imageError').innerHTML = "";
        }
    };

    //clear the warning message when the description is entered
    document.querySelector('#description').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#descriptionError').innerHTML = "";
        }
    });

    //clear the warning message when the shortDesc is entered
    document.querySelector('#shortDesc').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#shortDescError').innerHTML = "";
        }
    });

    //clear the warning message when the features info is entered
    document.querySelector('#features').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#featuresError').innerHTML = "";
        }
    });

    //clear the warning message when the dimensions info is entered
    document.querySelector('#dimensions').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#dimensionsError').innerHTML = "";
        }
    });

    //clear the warning message when price is entered
    document.querySelector('#price').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#priceError').innerHTML = "";
        }
    });

    //clear the warning message when availableQty is entered
    document.querySelector('#availableQty').addEventListener("blur", function(){
        if (this.value !== ""){
            document.querySelector('#availableQtyError').innerHTML = "";
        }
    });
}

// called after html body loaded
//References
//https://www.w3schools.com/jsref/event_onload.asp
function pageOnLoad() {
    loadCategory();
    addListenersEraseErr();
    //Add a listener to dynamically change the subCategory
    var category = document.getElementById("category");
    category.addEventListener("change", loadSubCategory);
    //Add a submit event listener to the form to invoke the validateProduct() method when the form is submitted
    document.form.addEventListener("submit", validateProduct);
    //Add a reser event listener to the form to invoke the resetInfo() method when the form is reset
    document.form.addEventListener("reset", resetInfo)
}

// reset error messages
function resetInfo(e) {
   document.querySelector('#categoryError').innerHTML = '';
   document.querySelector('#subCategoryError').innerHTML = '';
   document.querySelector('#nameError').innerHTML = '';
   document.querySelector('#imageError').innerHTML = '';
   document.querySelector('#descriptionError').innerHTML = '';
   document.querySelector('#shortDescError').innerHTML = '';
   document.querySelector('#featuresError').innerHTML = '';
   document.querySelector('#dimensionsError').innerHTML = '';
   document.querySelector('#priceError').innerHTML = '';
   document.querySelector('#availableQtyError').innerHTML = '';
}

// make sure all mandatory fields are filled
function validateProduct(e) {
    var valid = true;

    //display warning if category is not selected
    var category = document.querySelector('#category').value;
    if(category == ""){
		document.querySelector('#categoryError').style.color = "red";
        document.querySelector('#categoryError').innerHTML = "You must input a Category for the new product";
        valid = false;
    }

    //display warning if subCategory is empty
    var subCategory = document.querySelector('#subCategory').value;
    if(subCategory == ""){
		document.querySelector('#subCategoryError').style.color = "red";
        document.querySelector('#subCategoryError').innerHTML = "You must input a SubCategory for the new product";
        valid = false;
    }

    //display warning if name is empty
    var name = document.querySelector('#name').value;
    if(name == null || name == ""){
		document.querySelector('#nameError').style.color = "red";
        document.querySelector('#nameError').innerHTML = "You must input a Name for the new product";
        valid = false;
    }

    //display warning if main picture is empty
    var mainImage = document.querySelector('#mainImage').value;
    if(mainImage == null || mainImage == ""){
		document.querySelector('#imageError').style.color = "red";
        document.querySelector('#imageError').innerHTML = "You must upload a Main Picture for the new product";
        valid = false;
    }
    else if(!mainImage.toLowerCase().endsWith("jpg") && !mainImage.toLowerCase().endsWith("png") && !mainImage.toLowerCase().endsWith("jpeg") && !mainImage.toLowerCase().endsWith("gif")) {
		document.querySelector('#imageError').style.color = "red";
        document.querySelector('#imageError').innerHTML = "Only jpg, jpeg, png & gif files are allowed to be uploaded as pictures";
        valid = false;
    }

    //display warning if description is empty
    var description = document.querySelector('#description').value;
    if(description == null || description == ""){
		document.querySelector('#descriptionError').style.color = "red";
        document.querySelector('#descriptionError').innerHTML = "You must input a Description for the new product";
        valid = false;
    }

    //display warning if shortDesc is empty
    var shortDesc = document.querySelector('#shortDesc').value;
    if(shortDesc == null || shortDesc == ""){
		document.querySelector('#shortDescError').style.color = "red";
        document.querySelector('#shortDescError').innerHTML = "You must input a Short Desc for the new product";
        valid = false;
    }

    //display warning if features is empty
    var features = document.querySelector('#features').value;
    if(features == null || features == ""){
		document.querySelector('#featuresError').style.color = "red";
        document.querySelector('#featuresError').innerHTML = "You must input features info for the new product";
        valid = false;
    }

    //display warning if dimensions is empty
    var dimensions = document.querySelector('#dimensions').value;
    if(dimensions == null || dimensions == ""){
		document.querySelector('#dimensionsError').style.color = "red";
        document.querySelector('#dimensionsError').innerHTML = "You must input dimensions info for the new product";
        valid = false;
    }

    //display warning if price is empty
    var price = document.querySelector('#price').value;
    if(price == null || price == ""){
		document.querySelector('#priceError').style.color = "red";
        document.querySelector('#priceError').innerHTML = "You must input a Price for the new product";
        valid = false;
    }

    //display warning if availableQty is empty
    var availableQty = document.querySelector('#availableQty').value;
    if(availableQty == null || availableQty == ""){
		document.querySelector('#availableQtyError').style.color = "red";
        document.querySelector('#availableQtyError').innerHTML = "You must input the available quantity for the new product";
        valid = false;
    }

    if (!valid) {
        // Then we prevent the form from being submitted/sent by canceling the event
        event.preventDefault();
    }
    
    return valid;

};