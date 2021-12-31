<?php
//Reference https://www.w3schools.com/php/php_mysql_select.asp
//          https://stackoverflow.com/questions/6281963/how-to-build-a-json-array-from-mysql-database
//          https://stackoverflow.com/questions/18528692/passing-php-json-to-javascript-echo-json-encode-vs-echo-json-declaration
$servername = "localhost";
$database = "furnitures";
$username = "php";
$password = "CST8285_310";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// pull product information from the MySQL
if(!array_key_exists('id', $_GET)) {
    die("Product id is invalid, nothing to display");
}
$sql = "SELECT * FROM product WHERE id=" . $_GET['id'];
$result = $conn->query($sql);

if($result->num_rows > 0) {
    if ($row = $result->fetch_assoc()) { // search by primary key 'id', should return and only return 1 result
        $product['mainImage'] = $row['mainImage'];
        $imgs = array();
        array_push($imgs, $row['detailImage1']);
        array_push($imgs, $row['detailImage2']);
        array_push($imgs, $row['detailImage3']);
        array_push($imgs, $row['detailImage4']);
        $product['imgs'] = $imgs;
        
        $infos = array();
        array_push($infos, 'SUBCATAGORY');
        array_push($infos, $row['subCategory']);
        array_push($infos, 'DESCRIPTION');
        array_push($infos, $row['description']);
        array_push($infos, 'FEATURES');
        array_push($infos, $row['features']);
        array_push($infos, 'DIMENSIONS');
        array_push($infos, $row['dimensions']);
        $product['infos'] = $infos;

        $product['shortDesc'] = $row['shortDesc'];
        $product['price'] = $row['price'];
        $product['availableQty'] = $row['availableQty'];
        $product['rating'] = $row['rating'];
    }
}
else {
    $conn->close();
    die("Product id is invalid, nothing to display");
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en-us">
    <head>
        <title>S&L Furniture</title>
        <!--Setting the character set-->
        <meta charset="UTF-8">
        <meta name="keywords" content="S&L, Furniture, Sofa">
        <meta name="author" content="Simon & Laura">
        <!--Setting the viewport to make your website look good on all devices-->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--link to the fronts-->
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/furnitureproduct.css">
        <link rel="stylesheet" href="css/topandfooter.css">
        <script type="text/javascript" src="js/topmenu.js"></script>
        <!--passing-php-json-to-javascript-->
        <script>var productDetails = <?php echo json_encode($product); ?></script>
        <script type="text/javascript" src="js/product.js"></script>
    </head>

    <body onload="pageOnLoad();">
        <header>
            <h4>Your dream furniture!</h4>
        </header>

        <div class="row">
            <!-- LOGO -->
            <div class="col-2">	
                <div class="logoimg">
                    <a href="index.html"><img src="imgs/logo.jpg" alt="logo"></a>
                </div>
            </div><br><br>
            <!-- search bar-->
            <div class="col-8">
                <form id="searchform" class="search" action="furnituresearch.html">
                    <input id="searcharea" class="searcharea" type="text" id="search" name="text" placeholder="Search..">
                    <input id="searchbtn" class="searchbtn" type="submit" name="submit" value="SEARCH">
                </form>
            </div>
            <!-- login-->
            <div class="col-1">
                <button class="loginbtn">Sign Up</button>
                <div class="login-content">
                    <a href="signup.html">Login</a>
                    <a href="#">Register</a>
                </div>
            </div>
        	<div class="col-1">
                <a href="shoppingcart.html"><i class="fa fa-shopping-cart" style="font-size: 40px;"></i></a>
            </div>
        </div>

        <!--Menu-->
        <div id="menubutton">
        </div>

        <!-- column content-->
        <div class="row">
        </div>

        <!-- footer-->
        <footer>
            <nav>
                <a href="#">Contact Us</a> |
                <a href="#">Find a store</a> |
                <a href="#">Customer Service</a> |
                <a href="#">About Us</a>
            </nav>
        </footer>

    </body>

</html>