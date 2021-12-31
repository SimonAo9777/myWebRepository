// Use JSON object from php
//Reference
//https://www.w3schools.com/js/js_arrays.asp
if(sessionStorage.getItem("selectedProduct")) {
    sessionStorage.removeItem("selectedProduct");
}
sessionStorage.setItem("selectedProduct",JSON.stringify(productDetails));

// column content product detail pictures
//References
//https://www.w3schools.com/jsref/met_node_appendchild.asp
//https://www.w3schools.com/jsref/met_element_setattribute.asp
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
function productDetail(productDetails){
    var column = document.createElement("div");
    column.setAttribute('class','column side');
    var title = document.createElement("h4");
    title.innerHTML = 'Detailed picture';
    column.appendChild(title);
    var b = document.createElement("br");
    column.appendChild(b);
    b = document.createElement("br");
    column.appendChild(b);

    
    for (var i = 0; i < productDetails.imgs.length; i++) { 
        if(productDetails.imgs[i] != "") {
            var img = document.createElement("img");
            img.src = productDetails.imgs[i];
            img.style.width = '60%';
            column.appendChild(img);
            b = document.createElement("br");
            column.appendChild(b);
            b = document.createElement("br");
            column.appendChild(b);
        }
    }
        
    var mainElement = document.querySelectorAll(".row")[1];
    mainElement.appendChild(column);
}

// column content product descriptions
//References
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//https://www.w3schools.com/jsref/met_node_appendchild.asp
//https://www.w3schools.com/jsref/met_element_setattribute.asp
function productMain(productDetails) {
    var column = document.createElement("div");
    column.setAttribute('class','column middle');
    var d = document.createElement("div");
    var title = document.createElement("h2");
    title.innerHTML = productDetails.infos[1];
    d.appendChild(title);
    var img = document.createElement("img");
    img.src = productDetails.mainImage;
    img.style.width = '100%';
    d.appendChild(img);
    column.appendChild(d);

    //Reference
    // https://www.w3schools.com/js/js_loop_for.asp
    for (var i = 2; i < productDetails.infos.length; i+=2) { // Info pair
        var d = document.createElement("div");
        d.setAttribute('style','height: 150px;');
        var infoTitle = document.createElement("h2");
        infoTitle.innerHTML = productDetails.infos[i];
        d.appendChild(infoTitle);
        var b = document.createElement("br");
        d.appendChild(b);
        var b = document.createElement("br");
        d.appendChild(b);
        var b = document.createElement("br");
        d.appendChild(b);
        var infoDetail = document.createElement("p");
        infoDetail.innerHTML = productDetails.infos[i+1];
        d.appendChild(infoDetail);
        column.appendChild(d);
    }
    var mainElement = document.querySelectorAll(".row")[1];
    mainElement.appendChild(column);
}

// column content porduct rating and price
//References
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//https://www.w3schools.com/jsref/met_node_appendchild.asp
//https://www.w3schools.com/jsref/met_element_setattribute.asp
function productMisc(productDetails) {
    var column = document.createElement("div");
    column.setAttribute('class','column side');
    var rat = document.createElement("div");
    rat.setAttribute('class','rat');
    var b = document.createElement("br");
    rat.appendChild(b);
    b = document.createElement("br");
    rat.appendChild(b);
    var hr = document.createElement("hr");
    hr.innerHTML = 'CUSTOMER REVIEWS FOR THE '+productDetails.infos[1].toUpperCase();
    rat.appendChild(hr);
    b = document.createElement("br");
    rat.appendChild(b);
    var h3 = document.createElement("hr");
    h3.innerHTML = 'Star Rating';
    rat.appendChild(h3);
    b = document.createElement("br");
    rat.appendChild(b);
    for (var i = 0; i < productDetails.rating; i++) {
        var icon = document.createElement("span");
        icon.setAttribute('class','fa fa-star checked');
        rat.appendChild(icon);
    }
    var rating = document.createElement("h6");
    rating.innerHTML = ' '+productDetails.rating+'/5';
    rat.appendChild(rating);
    var review = document.createElement("a");
    review.setAttribute('href', '#');
    var writeYours = document.createElement("hr");
    writeYours.innerHTML = 'Write your own review';
    review.appendChild(writeYours);
    rat.appendChild(review);
    column.appendChild(rat);

    var p = document.createElement("div");
    b = document.createElement("br");
    p.appendChild(b);
    b = document.createElement("br");
    p.appendChild(b);
    var price = document.createElement("h1");
    price.innerHTML = '$ '+productDetails.price;
    p.appendChild(price);
    var shortDesc = document.createElement("h6");
    shortDesc.innerHTML = productDetails.shortDesc;
    p.appendChild(shortDesc);
    column.appendChild(p);

    var quan = document.createElement("div");
    quan.setAttribute('class', 'quan');
    var f = document.createElement("form");
    f.setAttribute('action', '/demo/demo_form.asp');
    var avail = document.createElement("label");
    avail.innerHTML = 'Quantity（1-'+productDetails.availableQty+')';
    f.appendChild(avail);
    var num = document.createElement("input");
    num.setAttribute('type','number');
    num.setAttribute('name','quantity');
    num.setAttribute('min', '1');
    num.setAttribute('max', productDetails.availableQty);
    num.addEventListener('change', function (e) {
        var price = JSON.parse(sessionStorage.getItem("selectedProduct")).price;
        var total = price*document.querySelector(".quan input[name=quantity]").value;
        var totalPrice = document.getElementById("totalPrice");
        totalPrice.innerText="$" + total.toFixed(2);
    });
    f.appendChild(num);
    quan.appendChild(f);
    column.appendChild(quan);

    var sum = document.createElement("div");
    sum.setAttribute('class', 'column side');
    
    var subt = document.createElement("h3");
    subt.innerHTML = 'Subtotal: ';
    var span = document.createElement("span");
    span.setAttribute('id', 'totalPrice');
    span.innerHTML = '$0.00';
    subt.appendChild(span);
    column.appendChild(subt);
    var btn = document.createElement("input");
    btn.setAttribute('type','button');
    btn.setAttribute('class','check');
    btn.setAttribute('onclick','alert("Proceed to  Checkout")');
    btn.setAttribute('value', 'Proceed to  Checkout');
    sum.appendChild(btn);
    column.appendChild(sum);

    var mainElement = document.querySelectorAll(".row")[1];
    mainElement.appendChild(column);

}

// calculate subtotal
//References
//https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
//https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
function addCartHandler(event) {
    event.stopPropagation();
    event.preventDefault();
        
    var price = JSON.parse(sessionStorage.getItem("selectedProduct")).price;
    var total = price*document.querySelector(".quan input[name=quantity]").value;
    var totalPrice = document.getElementById("totalPrice");
    totalPrice.innerText="$" + total.toFixed(2);
}
  
// called after html body loaded
//References
//https://www.w3schools.com/jsref/event_onload.asp
//https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
function pageOnLoad() {
    menuOnLoad();
    var productDetails = JSON.parse(sessionStorage.getItem("selectedProduct"));
    productDetail(productDetails);
    productMain(productDetails);
    productMisc(productDetails);
    document.querySelector(".quan input.check").onclick=addCartHandler;
}
