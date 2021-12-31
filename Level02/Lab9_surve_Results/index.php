<?php
    if(!file_exists('data/surveyresults.json')) {
        file_put_contents('data/surveyresults.json', '[]');
    }

    if(isset($_GET['submit']) && isset($_POST['submit'])) {
        array_pop($_POST);
        // Create code to append the survey data to the surveyresults.json file.
        // Do not edit above this line.

        // CODE HERE
        //Reference
        //https://scoutapm.com/blog/php-json_encode-serialize-php-objects-to-json
        //json_encode() is a native PHP function that allows you to convert PHP data into the JSON format.
        $jsonString = json_encode($_POST);
        
        //Reference
        //https://www.w3schools.com/php/func_filesystem_file_put_contents.asp
        file_put_contents('data/surveyresults.json', $jsonString);
        
        // Do not edit below this line.
        header('Location: results.php');
        exit();
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>Lab 9 - PHP 3</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="js/jquery-3.4.1.slim.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col">
                <h1 class="text-center mt-3">Survey</h1>
                <hr>
                <form action="?submit" method="post">
                    <div class="row mt-2">
                        <div class="col-md-4">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" class="form-control">
                        </div>
                        <div class="col-md-4">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" class="form-control">
                        </div>
                        <div class="col-md-4">
                            <label for="dob">Birthday:</label>
                            <input type="date" id="dob" name="dob" class="form-control">
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col">
                            <p class="text-center mb-auto">1=Lowest, 5=Highest</p>
                        </div>
                    </div><?php
                        $questions = explode("\n", file_get_contents('data/questions.txt'));

                        for($i = 0; $i < count($questions); $i++) {
                            echo <<<END

                    <hr>
                    <div class="row mt-2">
                        <div class="col-md-8">
                            <p>{$questions[$i]}</p>
                        </div>
                        <div class="col">
                            <div class="form-check-inline">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="answers[$i]" value="1">1
                                </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check-inline">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="answers[$i]" value="2">2
                                </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check-inline">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="answers[$i]" value="3">3
                                </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check-inline">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="answers[$i]" value="4">4
                                </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check-inline">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="answers[$i]" value="5">5
                                </label>
                            </div>
                        </div>
                    </div>
END;
                        }
                    ?>

                    <hr class="mt-auto">
                    <div class="row">
                        <div class="col text-center">
                            <input type="submit" name="submit" class="btn btn-primary">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>