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

// Get all categories
$allCategories = array();
$sql1 = "SELECT * FROM product_category WHERE forDisplayOnly='N'";
$result = $conn->query($sql1);

if($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $category_array['id'] = $row['id'];
        $category_array['header'] = $row['header'];

        array_push($allCategories, $category_array);
    }
}
else {
    $conn->close();
    die("Something wrong when retrieving Categories from database");
}

// Get all category-subCategory mapping
$category_mapping = array();
$sql2 = "SELECT * FROM findsubcategories ORDER BY categoryId";
$result = $conn->query($sql2);
$categoryId = "";
$subCategories = array();
if($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if($categoryId != "" && $categoryId != $row['categoryId']) {
            $row_array['categoryId'] = $categoryId;
            $row_array['subCategories'] = $subCategories;
            array_push($category_mapping, $row_array);
            $subCategories = array(); // clear array by re-instantiate
        }
        $categoryId = $row['categoryId'];
        array_push($subCategories, $row['name']);
    }
    // add last categoryId's subCategories
    $row_array['categoryId'] = $categoryId;
    $row_array['subCategories'] = $subCategories;
    array_push($category_mapping, $row_array);
}
else {
    $conn->close();
    die("Something wrong when retrieving Sub Categories from database");
}

// uploadImage and rename pictures to use product id
function uploadImage($subCategory, $id, $image, $description) {
    // if no file is chosen to upload, do nothing
    if(empty(basename($_FILES[$image]["name"]))) {
        return "";
    }
    $target_dir = "imgs/";
    $imageFileExtension = strtolower(pathinfo(basename($_FILES[$image]["name"]),PATHINFO_EXTENSION));
    
    switch ($image) {
        case "mainImage":
            $target_file = $target_dir . $subCategory . $id . "." . $imageFileExtension;
            break;
        case "detailImage1":
            $target_file = $target_dir . $subCategory . $id . "-1" . "." . $imageFileExtension;
            break;
        case "detailImage2":
            $target_file = $target_dir . $subCategory . $id . "-2" . "." . $imageFileExtension;
            break;
        case "detailImage3":
            $target_file = $target_dir . $subCategory . $id . "-3" . "." . $imageFileExtension;
            break;
        case "detailImage4":
            $target_file = $target_dir . $subCategory . $id . "-4" . "." . $imageFileExtension;
            break;
        default: // should not enter here
            $target_file = $target_dir . $subCategory . $id . "-tmp" . "." . $imageFileExtension;
    }
    try{
        $check = getimagesize($_FILES[$image]["tmp_name"]);
        if ($check == false) throw new Exception("invalid image file"); // Check if the file is a valid image
        move_uploaded_file($_FILES[$image]["tmp_name"], $target_file); // Move uploaded file from tmp to imgs/
        return $target_file;
    }
    catch(Exception $err){
        die($description . ": " . $err-> getMessage());
    }
}

    // after clicking "save" to submit form
    if(isset($_POST['save'])) {
        $sql1 = "INSERT INTO product (category, subCategory, name, 
                description, shortDesc, features, dimensions, 
                price, availableQty)
                VALUES ('".$_POST["category"]."','".$_POST["subCategory"]."','".$_POST["name"]."',
                '".$_POST["description"]."','".$_POST["shortDesc"]."','".$_POST["features"]."','".$_POST["dimensions"]."',
                '".$_POST["price"]."','".$_POST["availableQty"]."')";

        if($conn->query($sql1)===TRUE) { // insert a record first, then get the auto-increment id
            $last_id = $conn->insert_id;
            $mainImage = uploadImage($_POST["subCategory"], $last_id, "mainImage", "Main Picture"); // image will be renamed with product's unique id
            $detailImage1 = uploadImage($_POST["subCategory"], $last_id, "detailImage1", "Detail Picture 1");
            $detailImage2 = uploadImage($_POST["subCategory"], $last_id, "detailImage2", "Detail Picture 2");
            $detailImage3 = uploadImage($_POST["subCategory"], $last_id, "detailImage3", "Detail Picture 3");
            $detailImage4 = uploadImage($_POST["subCategory"], $last_id, "detailImage4", "Detail Picture 4");
            $sql2 = "UPDATE product SET mainImage='".$mainImage."', detailImage1='".$detailImage1."', 
                    detailImage2='".$detailImage2."', detailImage3='".$detailImage3."', detailImage4='".$detailImage4."' WHERE id=".$last_id;
            if($conn->query($sql2)!==TRUE) { // update record to include images' location
                echo "Error: fail to upload images for the new product!" . "<br>" . $conn->error;
            }
        } else {
            echo "Error: fail to add new product!" . "<br>" . $conn->error;
        }
        $conn->close();
        header('Location: product.php?id=' . $last_id);
        exit();
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
        <link rel="stylesheet" href="css/addproduct.css">
        <link rel="stylesheet" href="css/topandfooter.css"> 
        <!--passing-php-json-to-javascript--> 
        <script>
            var categories = <?php echo json_encode($allCategories); ?>;
            var subCategories = <?php echo json_encode($category_mapping); ?>;
        </script>
        <script type="text/javascript" src="js/addproduct.js"></script>
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
        </div>

        <!--Menu-->
        <div id="menubutton">
        </div>

        <!--form content-->
        <div class="formdialog">
            <form name="form" action="addProduct.php" method="post" enctype="multipart/form-data">
                <div class="fields">
                    <h4> Add new product</h4>
                    <h6> All fields with * are mandatory</h6>
                    <label for="category"> *Category</label><br>
				    <select id="category" name="category" size="1">
                        <option value=""> -- Select one -- </option>
				    </select>
                    <br><span id="categoryError"></span>
                    <br>
                    <label for="subCategory"> *SubCategory</label><br>
                    <select id="subCategory" name="subCategory" size="1">
                        <option value=""> -- Select one -- </option>
                    </select>
                    <br><span id="subCategoryError"></span>
                    <br>
                    <label for="name"> *Name</label><br>
                    <input type="text" id="name" name="name">
                    <br><span id="nameError"></span>
                    <br><br><br>
                    <label for="mainImage"> *Main Picture</label><br>
                    <input type="file" id="mainImage" name="mainImage">
                    <br><span id="imageError"></span>
                    <br>
                    <label for="detailImage1"> Detail Picture 1</label><br>
                    <input type="file" id="detailImage1" name="detailImage1">
                    <br>
                    <label for="detailImage2"> Detail Picture 2</label><br>
                    <input type="file" id="detailImage2" name="detailImage2">
                    <br>
                    <label for="detailImage3"> Detail Picture 3</label><br>
                    <input type="file" id="detailImage3" name="detailImage3">
                    <br>
                    <label for="detailImage4"> Detail Picture 4</label><br>
                    <input type="file" id="detailImage4" name="detailImage4">
                    <br><br><br>
                    <label for="description"> *Description</label><br>
                    <textarea id="description" name="description" rows="5" cols="50"></textarea>
                    <br><span id="descriptionError"></span>
                    <br>
                    <label for="shortDesc"> *Short Description</label><br>
                    <textarea id="shortDesc" name="shortDesc" rows="1" cols="50"></textarea>
                    <br><span id="shortDescError"></span>
                    <br>
                    <label for="features"> *Features</label><br>
                    <textarea id="features" name="features" rows="5" cols="50"></textarea>
                    <br><span id="featuresError"></span>
                    <br>
                    <label for="dimensions"> *Dimensions</label><br>
                    <textarea id="dimensions" name="dimensions" rows="5" cols="50"></textarea>
                    <br><span id="dimensionsError"></span>
                    <br><br><br>
                    <label for="price"> *Price</label><br>
                    <input type="number" id="price" name="price" min="0.01" step="0.01">
                    <br><span id="priceError"></span>
                    <br>
                    <label for="availableQty"> *Available Quantity</label><br>
                    <input type="number" id="availableQty" name="availableQty">
                    <br><span id="availableQtyError"></span>
                    <br>
                    <br>
                    <button type="submit" name="save">save</button>
                    <button type="reset" name="reset">reset</button>
                    <br><br>
                </div>
            </form>
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