// JSON data for featured products
//Reference
//https://www.w3schools.com/js/js_arrays.asp
var bestsellers=[
    {
        imageURL: "imgs/fp1.jpg",
        text: "fp1",
        link: "#"
        
    },
    {  imageURL: "imgs/fp2.jpg",
        text: "fp2",
        link: "#",},

    {  imageURL: "imgs/chairbest.jpg",
       text: "ch1",
       link: "#",}
    
];

// JSON data for categories
//Reference
//https://www.w3schools.com/js/js_arrays.asp
var categories = [
    {
        imageURL: "imgs/bed3.jpg",
        text: "sofa1",
        link: "#",
        name: "BEDS",
        price: "From $219"
    },
    {
        imageURL: "imgs/dining chair1.jpg",
        text: "dining chair1",
        link: "#",
        name: "CHAIRS",
        price: "From $59"
    },
    {
        imageURL: "imgs/table1.jpg",
        text: "desk1",
        link: "#",
        name: "TABLES",
        price: "From $59"
    },
    {
        imageURL: "imgs/img-sofa01.jpg",
        text: "sofa1",
        link: "#",
        name: "STORAGE",
        price: "From $219"
    },
    {
        imageURL: "imgs/desk1.jpg",
        text: "dining desk1",
        link: "#",
        name: "DESKS",
        price: "From $59"
    },
    {
        imageURL: "imgs/sideboard1.jpg",
        text: "desk1",
        link: "#",
        name: "SIDEBOARDS",
        price: "From $59"
    }
];

// generate featured products per JSON bestsellers
//References
//https://www.w3schools.com/jsref/met_node_appendchild.asp
//https://www.w3schools.com/jsref/met_element_setattribute.asp
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement														  
function createBestSellers(container, bestsellers) {
    var elem = document.createElement("div");
    elem.innerText="Bestsellers";
    elem.setAttribute("class", "top-left1");
    container.appendChild(elem);
    var fpimg = document.createElement("div");
    fpimg.setAttribute("class", "fpimg");
    container.appendChild(fpimg);
    for (var i=0;i<bestsellers.length; i++) {
        var item=bestsellers[i];
        elem = document.createElement("a");
        elem.setAttribute("href", item.link);
        var img=document.createElement("img");
        img.setAttribute("src", item.imageURL);
        img.setAttribute("alt", item.text);
        elem.appendChild(img);
        fpimg.appendChild(elem);
    }
}

// generate the poster
//References
//https://www.w3schools.com/jsref/met_element_setattribute.asp			
function creatPoster(container) {
    container.setAttribute("class", "poster");
    elem = document.createElement("a");
    elem.setAttribute("href", "#");
    var img = document.createElement("img");
    img.setAttribute("src", "imgs/poster1-fixedsize1.jpg");
    img.setAttribute("alt", "poster");
    elem.appendChild(img);
    container.appendChild(elem);

}

// generate categories per JSON categories
//References
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//https://www.w3schools.com/jsref/met_node_appendchild.asp
//https://www.w3schools.com/jsref/met_element_setattribute.asp															  
function createCategories(container, categories) {
    var x = 0;
    var y = 3;
    for (var i = 0; i < categories.length; i++) {
        if (x == 0) {
            var elemA = document.createElement("div");
            elemA.setAttribute("class", "products");
            container.appendChild(elemA);
        }
        var item = categories[i];
        var fpimg = document.createElement("div");
        fpimg.setAttribute("class", "container");
        elemA.appendChild(fpimg);
        elem = document.createElement("a");
        elem.setAttribute("href", item.link);
        var img = document.createElement("img");
        img.setAttribute("src", item.imageURL);
        img.setAttribute("alt", item.text);
        elem.appendChild(img);
        fpimg.appendChild(elem);
        var elemB = document.createElement("div");
        elemB.setAttribute("class", "centered-bottom");
        var H = document.createElement('h3');
        H.innerText = item.name;
        elemB.appendChild(H);
        var H = document.createElement('h3');
        H.innerText = item.price;
        elemB.appendChild(H);
        fpimg.appendChild(elemB);
        x++;
        if (x / y == 1) {
            x = 0;
            var BR = document.createElement('br');
            container.appendChild(BR);
            var BR = document.createElement('br');
            container.appendChild(BR);
            var BR = document.createElement('br');
            container.appendChild(BR);
        }
    }
}

// called after html body loaded
//References
//https://www.w3schools.com/jsref/event_onload.asp
//https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
function pageOnLoad() {
    menuOnLoad();
	
    var featuredHolder = document.getElementById("featured");
    createBestSellers(featuredHolder, bestsellers);
    var CategoriesHolder = document.getElementById("CATEGORIES");
    createCategories(CategoriesHolder, categories);
    var PosterHolder = document.getElementById("poster");
    creatPoster(PosterHolder);
}


