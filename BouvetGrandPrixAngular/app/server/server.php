 <?php
	header('Access-Control-Allow-Origin: *'); 
 
	$servername = "localhost";
	$username = "kristian";
	$password = "Xebcj7xKmCWCRWVs";
	$dbname = "testdatabase";

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

		//$sql = "SELECT * FROM `grandprix`";
		$sql = "SELECT name, time, score FROM grandprix ORDER BY score ASC";
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


	function createUserAndAddScore($name,$email,$time,$score) {

		global $servername, $username, $password, $dbname;
		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		
		// Check connection
		if ($conn->connect_error)
		{
		     die("Connection failed: " . $conn->connect_error);
		}
		
		$sql = "INSERT INTO grandprix (name, email, time, score)
		VALUES ('$name', '$email', '$time', '$score')";
				
		if ($conn->query($sql) === TRUE) {
		    return "Success";
		}
		else
		{
		    return "Error creating record: " . $conn->error;
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
		    return "Success";
		}
		else
		{
		    return "Error updating record: " . $conn->error;
		}
    	
		$conn->close();
	};
	
	function getPosition($email,$time,$score){
		global $servername, $username, $password, $dbname;
		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		
		// Check connection
		if ($conn->connect_error)
		{
		     die("Connection failed: " . $conn->connect_error);
		}
		
		$sql = "SELECT COUNT(*) AS position FROM grandprix WHERE score<'$score'";
		$result = $conn->query($sql);
		
		if ($result) {
			return json_encode(mysqli_fetch_assoc($result));
		}else{
			return "Could not find position";
		}
		
		$conn->close();
	}


	function setScore($name,$email,$time,$score)
	{
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
				if(intval($score) < $bestScore)
				{
					$msg = updateScore($email,$time,$score);
					if($msg=="Success"){
						echo getPosition($email,$time,$score);
					}else{
						echo $msg;
					}
				}
				else
				{
					echo getPosition($email,$time,$bestScore);
				}
			}
			else
			{
				$msg = createUserAndAddScore($name,$email,$time,$score);
				if($msg=="Success"){
					echo getPosition($email,$time,$score);
				}else{
					echo $msg;
				}		
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

