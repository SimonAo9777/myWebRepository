<?php

    //Referrences
    //Reference  the sample provided by the professor's in class
    //Reference PHP 2 Lecture Slides
    //https://www.w3schools.com/php/php_file_upload.asp
   $target_dir = "imgs/";
   $target_file = $target_dir . basename($_FILES["file"]["name"]);

  //Check if the source of the image file is true or false
   if(isset($_POST["upload"])) {
       $check = getimagesize($_FILES["file"]["tmp_name"]);

       if($check !== false) {
           if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                echo 1;
            }  else {
                echo 0;
            }
        } else {
           echo 0;
        }
    }
?>