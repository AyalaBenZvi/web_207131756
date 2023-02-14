
//geo location
function GetLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        console.log();
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("p").value = "Geo location is not supported";
    }
};


function showPosition(position) {
    document.getElementById('lat').value = position.coords.latitude;
    document.getElementById('long').value = position.coords.longitude;
}

//enable
    function enableCreateUser() {
        document.getElementById("distance").disabled = false;
        if (document.getElementById("location").checked) {
            document.getElementById("city").disabled = true;
        }
        if (!document.getElementById("location").checked) {
            document.getElementById("city").disabled = false;
            document.getElementById("distance").disabled = true;

        }
    }
// When the user clicks on send rank, open the popup
function sendRank() {
  const params = new URLSearchParams(window.location.search);
  const ID = params.get("id");

  // Extract Rate
  var s1Checked = document.getElementById("1").checked ? 1 : 0;
  var s2Checked = document.getElementById("2").checked ? 2 : 0;
  var s3Checked = document.getElementById("3").checked ? 3 : 0;
  var s4Checked = document.getElementById("4").checked ? 4 : 0;
  var s5Checked = document.getElementById("5").checked ? 5 : 0;
  var rate = s1Checked + s2Checked + s3Checked + s4Checked + s5Checked;
  // Build rquest body
  requestBody = {
    "id": ID,
    "rate": rate
  }
  // Send request to sever
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/sendRank");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(requestBody))
}



function thankForRate(){
    alert("Thank you for your rate!");
    window.location.href = "/";


}
    function valid_fields() {
        var field_of_volunteering = document.getElementById("years").value;
        var city = document.getElementById("city").value;
        if (field_of_volunteering == "") {
            alert("Field of volunteering is missing");
            return false;
        } else {
            result_function();
        }
    }




//VALIDATION
    function verifyFields() {
        var password = document.getElementById("password").value;
        if (password == "") {
            document.getElementById("message").innerHTML = "Fill the password please!";
            return false;
        }

        //minimum password length validation
        if (password.length < 8) {
            document.getElementById("message").innerHTML = "Password length must be at least 8 characters";
            return false;
        }

        //maximum length of password validation
        if (password.length > 15) {
            document.getElementById("message").innerHTML = "Password length must not exceed 15 characters";
            return false;
        }
        // else {
        //     alert("Password is correct");
        // }

        var email = document.getElementById("email").value;
        if (email == "") {
            document.getElementById("message").innerHTML = "Fill the email please!";
            return false;
        }

        var Age = document.getElementById("Age").value;
        if (Age == "" ) {
            document.getElementById("message").innerHTML = "Fill your age please!";
            return false;
        }


        var FullName = document.getElementById("FullName").value;
        if (FullName == "") {
            document.getElementById("message").innerHTML = "Fill the User Name please, between 6-20 characters";
            return false;
        }


        var PhoneNumber = document.getElementById("PhoneNumber").value;
        if (PhoneNumber == "") {
            document.getElementById("message").innerHTML = "Please fill the phone number field, in the format of 10 digits";
            return false;
        }
        // else {
        //     alert("User Name is correct");
        // }
    }


    //check passwords are same
    function validateForm() {
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        if (password1 != password2) {
            alert("Passwords are not same")
            return false;
        }

        // else {
        //     alert("User created successfully");
        // }
    }

