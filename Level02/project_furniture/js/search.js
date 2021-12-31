// JSON data for all products
//Reference
//https://www.w3schools.com/js/js_arrays.asp
/*var allProducts=[
    {
      category: "Living Room",
      subCategory: "Sofa",
      name: "RS01",
      page: "frunitureproduct.html",
      image: "imgs/sofa1.jpg",
      code: "#300.001",
      price: 1999.98,
      rating: 5,
    },
    {
      category: "Living Room",
      subCategory: "Sofa",
      name: "RS02",
      page: "",
      image: "imgs/sofa2.jpg",
      code: "#300.002",
      price: 10409.99,
      rating: 4,
    },
    {
      category: "Living Room",
      subCategory: "Sofa",
      name: "RS03",
      page: "",
      image: "imgs/sofa3.jpg",
      code: "#300.003",
      price: 1909.99,
      rating: 4,
      },
     {
      category: "Living Room",
      subCategory: "Sofa",
      name: "RS04",
      page: "",
      image: "imgs/sofa4.jpg",
      code: "#300.004",
      price: 1909.99,
      rating: 5,
      },
      {
      category: "Living Room",
      subCategory: "Sofa",
      name: "RS05",
      page: "",
      image: "imgs/sofa5.jpg",
      code: "#300.005",
      price: 2909.99,
      rating: 5,
      },
      {
      category: "Living Room",
      subCategory: "Sofa",
      name: "RS06",
      page: "",
      image: "imgs/sofa6.jpg",
      code: "#300.006",
      price: 1599.99,
      rating: 3,
      },
      {
      category: "Bed Room",
      subCategory: "Bed",
      name: "RB01",
      page: "",
      image: "imgs/bed1.jpg",
      code: "#100.001",
      price: 409.99,
      rating: 4,
      },
      {
      category: "Bed Room",
      subCategory: "Bed",
      name: "RB03",
      page: "",
      image: "imgs/bed3.jpg",
      code: "#100.003",
      price: 809.99,
      rating: 4,
      },
      {
      category: "Bed Room",
      subCategory: "Bed",
      name: "RB02",
      page: "",
      image: "imgs/bed2.jpg",
      code: "#100.002",
      price: 709.99,
      rating: 5,
      },
      {
      category: "Dinning Room",
      subCategory: "Table",
      name: "RT01",
      page: "",
      image: "imgs/table1.jpg",
      code: "#200.001",
      price: 709.99,
      rating: 5,
      },
      {
      category: "Dinning Room",
      subCategory: "Table",
      name: "RT02",
      page: "",
      image: "imgs/table2.jpg",
      code: "#200.002",
      price: 509.99,
      rating: 3,
     },
     {
      category: "Dinning Room",
      subCategory: "Table",
      name: "RT03",
      page: "",
      image: "imgs/table3.jpg",
      code: "#200.003",
      price: 499.99,
      rating: 4,
       },
  ]
*/
//Reference
//https://stackoverflow.com/questions/20572624/how-to-get-the-select-box-values-in-a-variable
//https://www.w3schools.com/js/js_this.asp
var selectedProducts = []; // the product list after applying searching or filtering
  
function filterings(container, filteringCategory) {
        var h = document.createElement("h4");
        h.innerText = filteringCategory.header;
        container.appendChild(h);
        var f = document.createElement("form");
        f.setAttribute('action', '');
        var search = sessionStorage.getItem("filteringByCategory");
        if(search) {
            search = JSON.parse(search);
            var searchKeywords = search.split(",");
        }
		for(let category of filteringCategory.subCategories) {
            var checkbox = document.createElement("input");
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', filteringCategory.categoryName);
            checkbox.setAttribute('value', category);
            if(search) {
                for(let m of searchKeywords) {
                    if (category.toLowerCase() == m) {
                        checkbox.checked = true; // check this filtering per search
                        break;
                    }
                }
            }
			if(filteringCategory.categoryName != "price") {
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        var filter = sessionStorage.getItem("filteringByCategory");
                        if(!filter) {
                            sessionStorage.setItem("filteringByCategory",JSON.stringify(this.value));
                        } else {
                            filter = JSON.parse(filter);
                            filter += ','+this.value.trim();
                            sessionStorage.setItem("filteringByCategory",JSON.stringify(filter));
                        }
                    } else {
                        var filter = sessionStorage.getItem("filteringByCategory");
                        if(!filter) {
                            //should not happen, uncheck must happen when the checkbox has been checked (filteringByPriceBottom already exists)
                        } else {
                            filter = JSON.parse(filter);
                            var filters = filter.split(",");
                            for(var i=0; i<filters.length; i++) {
                                if(filters[i] === this.value) {
                                    filters.splice(i,1);
                                    break;
                                }
                            }
                            sessionStorage.setItem("filteringByCategory",JSON.stringify(filters.toString()));
                        }
                    }
                    filterResult();
                });
            } else {//"$0-$100","$100-$1000","$1000-$10000","$10000-$20000","$20000+"
                checkbox.addEventListener('change', function() {
                    var priceBottom, priceTop; // get Min value and Max value of the price filtering item
                    var priceFilter = this.value.replace(/\$/g,"");
                    if(!priceFilter.includes("+")) {
                        priceBottom = priceFilter.split("-")[0];
                        priceTop = priceFilter.split("-")[1];
                    } else {
                        priceBottom = priceFilter.split("+")[0];
                        priceTop = "999999999";
                    }
                    if (this.checked) {
                        var existingPriceFilter = sessionStorage.getItem("filteringByPriceBottom");
                        if(!existingPriceFilter) {
                            sessionStorage.setItem("filteringByPriceBottom",JSON.stringify(priceBottom));
                            sessionStorage.setItem("filteringByPriceTop",JSON.stringify(priceTop));
                        } else {
                            var filter = JSON.parse(existingPriceFilter);
                            filter += ','+priceBottom;
                            sessionStorage.setItem("filteringByPriceBottom",JSON.stringify(filter));
                            filter = JSON.parse(sessionStorage.getItem("filteringByPriceTop"));
                            filter += ','+priceTop;
                            sessionStorage.setItem("filteringByPriceTop",JSON.stringify(filter));
                        }
                    } else {
                        var existingPriceFilter = sessionStorage.getItem("filteringByPriceBottom");
                        if(!existingPriceFilter) {
                            //should not happen, uncheck must happen when the checkbox has been checked (filteringByPriceBottom already exists)
                        } else {
                            var priceBottomFilter = JSON.parse(existingPriceFilter);
                            var priceTopFilter = JSON.parse(sessionStorage.getItem("filteringByPriceTop"));
                            var bottomFilters = priceBottomFilter.split(",");
                            var topFilters = priceTopFilter.split(",");
                            for(var i=0; i<bottomFilters.length; i++) {
                                if(bottomFilters[i] === priceBottom) {
                                    bottomFilters.splice(i,1);
                                    topFilters.splice(i,1);
                                    break;
                                }
                            }
                            sessionStorage.setItem("filteringByPriceBottom",JSON.stringify(bottomFilters.toString()));
                            sessionStorage.setItem("filteringByPriceTop",JSON.stringify(topFilters.toString()));
                        }
                    }
                    filterResult();
                });
            }
            f.appendChild(checkbox);
            var label = document.createElement("label");
            label.innerText = category;
            f.appendChild(label);
            var b = document.createElement("br");
            f.appendChild(b);
        }
        container.appendChild(f);
    }

// DOM for filtering list
function loadFiltering() {
    var column = document.createElement("div");
    column.setAttribute('class', 'column');
    var vertical_menu = document.createElement("div");
    vertical_menu.setAttribute('class', 'vertical-menu');
    for(let category of filteringCategories){
        // we can do it in one line instead of 2 as above
        filterings(vertical_menu, category);
    }
    column.appendChild(vertical_menu);
    document.querySelectorAll(".row")[1].appendChild(column);
    
    // clear filtering in sessionStorage
    sessionStorage.removeItem("filteringByCategory");
    sessionStorage.removeItem("filteringByPriceBottom");
    sessionStorage.removeItem("filteringByPriceTop");
}


//dynamically display the products matching searching or filtering condition
function getSelectedProductsBySearch() {
    // only when freshing the searching page comes here, remove previous filterings
    if(sessionStorage.getItem("filteringByCategory")) {
        sessionStorage.removeItem("filteringByCategory")
    }
    if(sessionStorage.getItem("filteringByPriceBottom")) {
        sessionStorage.removeItem("filteringByPriceBottom")
        sessionStorage.removeItem("filteringByPriceTop")
    }
    // get searching key words
	var search = sessionStorage.getItem("search");
    //console.log("search:"+search);
    if(!search) {
        selectedProducts = allProducts;
    }
    else {
        search= JSON.parse(search).toLowerCase();
        var or = search.split (" ");
        sessionStorage.setItem("filteringByCategory",JSON.stringify(or.toString()));
		var i=0;
        for(let product of allProducts){
            for(let condition of or) {
                if(product.subCategory.toLowerCase() == condition) {
                    selectedProducts[i++] = product;
                    break;
                }
            }
        }
        sessionStorage.removeItem("search");
    }
}

// Generate page content based on the latest selectedProducts, any filtering or sorting needs call this
//Reference
//https://www.w3schools.com/js/js_arrays.asp
//https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
function loadResults() { 
    //console.log("loading... selected:"+selectedProducts.length);
    if(document.querySelector('#summary')) {
        var sum = document.querySelector('#summary');
        sum.parentNode.removeChild(sum);
    }
    var summary = document.createElement("div");
    summary.setAttribute('id', 'summary');
    var totalFound = document.createElement("b");
    totalFound.innerText = 'Products found ('+selectedProducts.length+')';
    summary.appendChild(totalFound);
    document.querySelectorAll(".row")[1].appendChild(summary);
    
    var content = document.querySelectorAll(".row")[1].getElementsByClassName("column");
    if (content.length != 1) {
        for(var i=1; i<content.length;) {
            var div = content[i];
            div.parentNode.removeChild(div);
        }
    }

    var column1 = document.createElement("div");
    column1.setAttribute('class', 'column');
    columnDisplaySelected(column1, 0, selectedProducts);
    document.querySelectorAll(".row")[1].appendChild(column1);
    var column2 = document.createElement("div");
    column2.setAttribute('class', 'column');
    columnDisplaySelected(column2, 1, selectedProducts);
    document.querySelectorAll(".row")[1].appendChild(column2);
    var column3 = document.createElement("div");
    column3.setAttribute('class', 'column');
    columnDisplaySelected(column3, 2, selectedProducts);
    document.querySelectorAll(".row")[1].appendChild(column3);

}

// display column div content by DOM
//Reference
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
function columnDisplaySelected(column, columnIndex, selectedProducts) {
    if(selectedProducts.length==0) {
        if(columnIndex==0) {
            var noResult = document.createElement("label");
            noResult.innerText = 'Sorry! no matching products';
            column.appendChild(noResult);
        }
    } else{
        for(i=columnIndex; i<selectedProducts.length; i+=3){
            var h = document.createElement("h3"); // product title
            h.innerText = selectedProducts[i].category+' '+selectedProducts[i].subCategory+' '+selectedProducts[i].name;
            column.appendChild(h);
            var lk = document.createElement("a"); // link to product page
            lk.setAttribute('href', selectedProducts[i].page);
            var img = document.createElement("img");
            img.setAttribute('src', selectedProducts[i].image);
            img.style.width='100%';
            lk.appendChild(img);
            column.appendChild(lk);
            var p = document.createElement("p"); // code and price
            p.innerHTML = selectedProducts[i].code;
            var br = document.createElement("br");
            p.appendChild(br);
            var price = document.createElement("b");
            price.innerText = '$'+selectedProducts[i].price.toString();
            p.appendChild(price);
            column.appendChild(p);
            var label = document.createElement("label"); // rating
            label.innerText = selectedProducts[i].rating+'/5';
            column.appendChild(label);
            for (var j = 0; j < selectedProducts[i].rating; j++) {
                var icon = document.createElement("span");
                icon.setAttribute('class','fa fa-star checked');
                column.appendChild(icon);
            }
            var f = document.createElement("form"); // ADD TO CART
            f.setAttribute('action', '');
            var btn = document.createElement("input");
            btn.setAttribute('type', 'button');
            btn.setAttribute('onclick', 'alert("ADD TO CART")');
            btn.setAttribute('value', 'ADD TO CART');
            f.appendChild(btn);
            column.appendChild(f);
        }
    }
}

//sorting searched products
//Reference
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
function sortResult() {
    if(selectedProducts.length != 0) {
        var sortingRule = document.getElementById("sortinglist").value;
        if(sortingRule == "priceAsc") {
         selectedProducts.sort((a,b)=> a.price - b.price);
        }else if(sortingRule == "priceDesc") {
         selectedProducts.sort((a,b)=> b.price - a.price);
        }else if(sortingRule == "ratingAsc") {
         selectedProducts.sort((a,b)=> a.rating - b.rating);
        }else if(sortingRule == "ratingDesc") {
            selectedProducts.sort((a,b)=> b.rating - a.rating);
        }
    }
    loadResults();
}

//filtering searched products
//References
//https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
// https://www.w3schools.com/js/js_loop_for.asp
function filterResult() {
    var categoryFilter = sessionStorage.getItem("filteringByCategory");
    //console.log("filteringByCategory:"+categoryFilter);
    var priceBottomFilter = sessionStorage.getItem("filteringByPriceBottom");
    //console.log("priceBottomFilter:"+priceBottomFilter);
    var priceTopFilter = sessionStorage.getItem("filteringByPriceTop");
    //console.log("priceTopFilter:"+priceTopFilter);
    if(!categoryFilter || JSON.parse(categoryFilter) === "") { // no category filtering
        if(!priceBottomFilter || JSON.parse(priceBottomFilter) === "") { // no any filtering
            selectedProducts = allProducts;
            sessionStorage.removeItem("filteringByCategory");
            sessionStorage.removeItem("filteringByPriceBottom");
            sessionStorage.removeItem("filteringByPriceTop");
        }
        else {
            priceBottomFilter= JSON.parse(priceBottomFilter);
            var mins = priceBottomFilter.split (",");
            priceTopFilter = JSON.parse(priceTopFilter);
            var maxs = priceTopFilter.split(",");
            selectedProducts = [];
            var i=0;
            for(let product of allProducts){
                for(var j=0; j<mins.length; j++) {
                    if(product.price >= mins[j] && product.price <= maxs[j]) {
                        selectedProducts[i++] = product;
                        break;
                    }
                }
            }
        }
    }
    else {
        categoryFilter= JSON.parse(categoryFilter).toLowerCase();
        var or = categoryFilter.split (",");
        selectedProducts = [];
        var i=0;
        if(!priceBottomFilter || JSON.parse(priceBottomFilter) === "") { // no price filtering
            sessionStorage.removeItem("filteringByPriceBottom");
            sessionStorage.removeItem("filteringByPriceTop");
            
            for(let product of allProducts){
                for(let condition of or) {
                    if(product.subCategory.toLowerCase() == condition) {
                        selectedProducts[i++] = product;
                        break;
                    }
                }
            }
        }
        else {
            priceBottomFilter= JSON.parse(priceBottomFilter);
            var mins = priceBottomFilter.split (",");
            priceTopFilter = JSON.parse(priceTopFilter);
            var maxs = priceTopFilter.split(",");
            selectedProducts = [];
            var i=0;
            for(let product of allProducts){
                var matching = false;
                for(let condition of or) {
                    if(product.subCategory.toLowerCase() == condition) {
                        for(var j=0; j<mins.length; j++) {
                            if(product.price >= mins[j] && product.price <= maxs[j]) {
                                selectedProducts[i++] = product;
                                matching = true;
                                break;
                            }
                        }
                        if(matching) {
                            break; // go to check next product
                        }
                    }
                }
            }
        }
    }
    sortResult();
}

// called after html body loaded
//References
//https://www.w3schools.com/jsref/event_onload.asp
//https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
function pageOnLoad() {
    menuOnLoad();
    getSelectedProductsBySearch();
    loadFiltering();
    sortResult(""); // When the page is firstly loaded, no sorting
    var sorting = document.getElementById("sortinglist");
    sorting.addEventListener("change", sortResult);
}
