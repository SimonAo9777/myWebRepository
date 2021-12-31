<!--Reference  the sample provided by the professor's in class-->
<!--Reference PHP 1 Lecture Slides-->
<!--Reference https://www.php.net/manual/en/function.scandir.php-->
<!--Reference forEach() https://www.w3schools.com/jsref/jsref_foreach.asp-->

<!DOCTYPE html>
<html>
<head>
    <title>Lab 7 - PHP 1</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="js/jquery-3.4.1.slim.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col">
                <h1 class="jumbotron text-center">Image Gallery</h1>
                <hr>
                <div class="row mb-3">
                    <?php
                       //php find files in directory and subdirectories
                       $images = scandir('images');    
                       //Destroy a single fragment element                  
                       unset($images[0]);
                       unset($images[1]);

                       //The forEach() method calls a function once for each element in an array, in order.
                       foreach($images as $image){
                              echo "<div class=\"col-md-4 my-auto\">"; 
                              echo "<img src=\"images/$image\" class=\"img-fluid img-thumbnail\">";
                              echo "</div>";
                       }
                      
                    ?>             
                </div>
            </div>
        </div>
    </div>
</body>
</html>