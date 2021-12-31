// JSON data for menu
//Reference
//https://www.w3schools.com/js/js_arrays.asp
var menu = [
    { 
      menu_id: "NEW",
      menu_name: "New",
      menu_link: "",
      submenu: null
    },
    {
        menu_id: "LIVING_ROOM",
        menu_name: "Living Room",
        menu_link: "",
        submenu: [
            {
                menu_id: "SOFAS",
                menu_name: "Sofas",
                menu_link: "",
                submenu: null
            },
            {
                menu_id: "LOVESEATS",
                menu_name: "Loveseats",
                menu_link: "",
                submenu: null
            },
            {
                menu_id: "COFFEE TABLE",
                menu_name: "Coffee Table",
                menu_link: "",
                submenu: null
            }
        ]
    },
    {
        menu_id: "DINING_ROOM",
        menu_name: "Dining Room",
        menu_link: "",
        submenu: [
            {
                menu_id: "TABLES",
                menu_name: "Tables",
                menu_link: "",
                submenu: null
            },
            {
                menu_id: "CHAIRS",
                menu_name: "Chairs",
                menu_link: "",
                submenu: null
            },
            {
                menu_id: "SIDEBOARDS",
                menu_name: "Sideboards",
                menu_link: "",
                submenu: null
            }
        ]
    },
    {
        menu_id: "BED_ROOM",
        menu_name: "Bed Room",
        menu_link: "",
        submenu: [
            {
                menu_id: "BEDS",
                menu_name: "Beds",
                menu_link: "",
                submenu: null
            },
            {
                menu_id: "MATTRESSES",
                menu_name: "Mattresses",
                menu_link: "",
                submenu: null
            },
            {
                menu_id: "NIGHTSTANDS",
                menu_name: "Nightstands",
                menu_link: "",
                submenu: null
            }
        ]
    },
    {
        menu_id: "OFFICE",
        menu_name: "Office",
        menu_link: "",
        submenu: [
            {
                menu_id: "DESKS",
                menu_name: "Desks",
                menu_link: "",
                submenu: null
            },
            {
                menu_id: "CHAIRS",
                menu_name: "Chairs",
                menu_link: "",
                submenu: null
            },
            {
                menu_id: "STORAGE",
                menu_name: "Storage",
                menu_link: "",
                submenu: null
            }
        ]
    }
];

// generate top level menu
//References
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//https://www.w3schools.com/jsref/met_node_appendchild.asp
//https://www.w3schools.com/jsref/met_element_setattribute.asp
function createMenu(container, menu) {
    for (var i=0; i<menu.length; i++) {
        m = menu[i];
        var elem = document.createElement("div");
        container.appendChild(elem);
        elem.setAttribute("class","topmenu");
        var button = document.createElement("button");
        button.setAttribute("class", "menubtn");
        button.innerText=m.menu_name;
        elem.appendChild(button);
        if (m.submenu) {
            elem.appendChild(createSubmenu(m.submenu));
        }
    }
}

// generate sub menu
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//https://www.w3schools.com/jsref/met_node_appendchild.asp
//https://www.w3schools.com/jsref/met_element_setattribute.asp
// https://www.w3schools.com/js/js_loop_for.asp
function createSubmenu(submenu) {
    var container = document.createElement("div");
    container.setAttribute("class","menu-content");
    for (var i=0; i<submenu.length; i++) {
        var m = submenu[i];
        var elem = document.createElement("a");
        elem.innerText=m.menu_name;
        elem.setAttribute("href", m.menu_link);
        container.appendChild(elem);
    }
   
    return container;
}

// action triggered by search button
//References
//https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
function searchClicked(form) {
    var search=document.getElementById("searcharea").value||"";
    if(search !== "") {
        sessionStorage.setItem("search",JSON.stringify(search));
        location.href="search.php";
    }
}

// called by pageOnLoad()
//References
//https://www.w3schools.com/jsref/event_onload.asp
//https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
//https://www.w3schools.com/jquery/event_preventdefault.asp
function menuOnLoad() {
    var menuHolder = document.getElementById("menubutton");
    createMenu(menuHolder, menu);

    var searchForm = document.getElementById("searchform");
    var searchBtn = document.getElementById("searchbtn");
    searchBtn.onclick = function(e) {
        var event = e || window.event;
        event.stopPropagation();
        event.preventDefault();
        searchClicked(searchForm); 
    };
}

 