<?php

$servername = "bouvet.mysql.domeneshop.no";
$username = "bouvet";
$password = "2Nsr2rxZfW7V2Wh";
$dbname = "bouvet";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// echo "Connected successfully";
function getScores()
{
    global $servername, $username, $password, $dbname;
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    //$sql = "SELECT name, email, time, score FROM grandprix";
    $sql = "SELECT name, email, time, score FROM grandprix ORDER BY CAST(`time` AS SIGNED) ASC";
    $result = $conn->query($sql);

    if ($result) {

        $rows = array();
        while($r = mysqli_fetch_assoc($result))
        {
            $rows[] = $r;
        }
        echo json_encode($rows);

    } else {
        echo "0 results \n";
    }

    $conn->close();
}


function createUserAndAddScore($name,$email,$time,$score){

    global $servername, $username, $password, $dbname;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO grandprix (name, email, time, score) VALUES ('$name', '$email', '$time', '$score')";

    if ($conn->query($sql) === TRUE) {

        echo "Success";
    }
    else
    {
        echo "Error creating record: " . $conn->error;
    }

    $conn->close();
};

function updateScore($email,$time,$score){

    global $servername, $username, $password, $dbname;
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "UPDATE grandprix SET score='$score', time='$time' WHERE email='$email'";

    if ($conn->query($sql) === TRUE) {

        echo "Success";
    }
    else
    {
        echo "Error updating record: " . $conn->error;
    }

    $conn->close();
};

function setScore($name,$email,$time,$score)
{
    $email = preg_replace('/\s+/', '', $email);
    $time = preg_replace('/\s+/', '', $time);
    $score = preg_replace('/\s+/', '', $score);

    global $servername, $username, $password, $dbname;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM grandprix WHERE email='$email' LIMIT 1";

    $result = $conn->query($sql);

    if ($result)
    {
        $rows = array();

        while($r = mysqli_fetch_assoc($result))
        {
            $rows[] = $r;
        }

        if (count($rows) > 0)
        {

            $bestScore = intval($rows[0]['score']);
            //
            // If new score is not greater than the best score
            //
            if(intval($score) > $bestScore)
            {

                updateScore($email,$time,$score);
            }
            else
            {
                echo "new score is lesser than the best score!!! \n your best score is: ".$bestScore;
            }
        }
        else
        {
            createUserAndAddScore($name,$email,$time,$score);
        }
    }
    else
    {
        echo "0 results \n";
    }


    $conn->close();
}



if(isset($_POST['action']) && !empty($_POST['action'])) {

    $action = $_POST['action'];
    //echo "action : ".$action."\n";

    switch($action)
    {
        case 'getScores' : getScores();
            break;
        case 'setScore' : setScore($_POST['name'],$_POST['email'],$_POST['time'],$_POST['score']);
            break;
        default:
            break;
    }
}
?> 

