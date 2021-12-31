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

// $allProducts stores all products queried from MySQL
$allProducts = array();
$sql1 = "SELECT * FROM product";
$result = $conn->query($sql1);

if($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row_array['category'] = $row['category'];
        $row_array['subCategory'] = $row['subCategory'];
        $row_array['name'] = $row['name'];
        $row_array['page'] = "product.php?id=" . $row['id'];
        $row_array['image'] = $row['mainImage'];
        $row_array['code'] = "#" . $row['id'];
        $row_array['price'] = $row['price'];
        $row_array['rating'] = "5";

        array_push($allProducts, $row_array);
    }
}
else {
    $conn->close();
    die("Something wrong when retrieving products from database");
}

// Get all category-subCategory from MySQL, for filtering
$filteringCategories = array();
$sql2 = "SELECT * FROM findsubcategoriesforfiltering ORDER BY displayOrder";
$result = $conn->query($sql2);
$categoryId = "";
$categoryHeader = "";
$subCategories = array();
if($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if($categoryId != "" && $categoryId != $row['categoryId']) {
            $row_array['categoryName'] = $categoryId;
            $row_array['header'] = $categoryHeader;
            $row_array['subCategories'] = $subCategories;
            array_push($filteringCategories, $row_array);
            $subCategories = array(); // clear array by re-instantiate
        }
        $categoryId = $row['categoryId'];
        $categoryHeader = $row['categoryHeader'];
        array_push($subCategories, $row['name']);
    }
    // add last categoryId's subCategories
    $row_array['categoryName'] = $categoryId;
    $row_array['header'] = $categoryHeader;
    $row_array['subCategories'] = $subCategories;
    array_push($filteringCategories, $row_array);
}
else {
    $conn->close();
    die("Something wrong when retrieving categories filtering from database");
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
        <link rel="stylesheet" href="css/furnituresearch.css">
        <link rel="stylesheet" href="css/topandfooter.css">
        <script type="text/javascript" src="js/topmenu.js"></script>
        <!--passing-php-json-to-javascript-->
        <script>
            var allProducts = <?php echo json_encode($allProducts); ?>;
            var filteringCategories = <?php echo json_encode($filteringCategories); ?>;
        </script>
        <script type="text/javascript" src="js/search.js"></script>
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

        <!--Sorting-->
        <div>
            <div class="sorting">
                <form>
                    <label for="sorting"> Sort by:</label>
				    <select id="sortinglist" name="sortinglist" size="1">
                        <a href="#"><option value=""> ------------ </option></a>
                        <a href="#"><option value="priceAsc"> Price low to high </option></a>
                        <a href="#"><option value="priceDesc"> Price hight to low </option></a>
                        <a href="#"><option value="ratingAsc"> Rating low to high</option></a>
                        <a href="#"><option value="ratingDesc"> Rating high to low</option></a>
				    </select>
               </form>
            </div>
        </div>
        <br>
        <!-- column content-->
        <div class="row">
        </div>

        

        <!-- footer-->
        <footer>
            <nav>
                <a href="#">Contact Us</a>
                <a href="#">Find a store</a> 
                <a href="#">Customer Service</a> 
                <a href="#">About Us</a>
            </nav>
        </footer>

	</body>

</html>