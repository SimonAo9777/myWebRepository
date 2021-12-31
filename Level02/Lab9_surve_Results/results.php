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
                <h1 class="text-center mt-3">Survey Results</h1>
                <hr><?php
                    $questions = explode("\n", file_get_contents('data/questions.txt'));

                    // Create code that will load data from the data/surveyresults.json file and print the data with the same structure as the HTML example below.
                    // Do not edit above this line.
                    
                    //Reference
                    //https://www.w3schools.com/php/func_filesystem_file_get_contents.asp
                    //Read a file into a string
                    $jsonString=file_get_contents('data/surveyresults.json');
                    
                    //Reference
                    //https://www.w3schools.com/php/func_json_decode.asp
                    //The json_decode() function is used to decode or convert a JSON object to a PHP object.
                    $data = json_decode($jsonString,true);
                        echo <<<END
                <div class="card mb-3">
                    <h5 class="card-header">{$data["name"]}</h5>
                    <div class="card-body">
                        <p class="card-text">Age:{$data["dob"]}</p>
                        <p class="card-text">Email:{$data["email"]}</p>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>How much did you enjoy CST8285 Web Programming?</th>
                                    <td>{$data["answers"][0]}</td>
                                </tr>
                                <tr>
                                    <th>Was the content delivered in an easy to follow format?</th>
                                    <td>{$data["answers"][1]}</td>
                                </tr>
                                <tr>
                                    <th>How efficient was the professors teaching style?</th>
                                    <td>{$data["answers"][2]}</td>
                                </tr>
                                <tr>
                                    <th>Was the course work fair and balanced?</th>
                                    <td>{$data["answers"][3]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
END;
       
                    // Do not edit below this line.
                ?>
            </div>
        </div>
    </div>
</body>
</html>