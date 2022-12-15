function send_rank() {
    // Extract Rate
    var s1Checked = document.getElementById("1").checked ? 1 : 0;
    var s2Checked = document.getElementById("2").checked ? 2 : 0;
    var s3Checked = document.getElementById("3").checked ? 3 : 0;
    var s4Checked = document.getElementById("4").checked ? 4 : 0;
    var s5Checked = document.getElementById("5").checked ? 5 : 0;
    var rank = s1Checked + s2Checked + s3Checked + s4Checked + s5Checked;
    alert("We got your rate, thank you!")
    // Build rquest body
}
//geo locaitom
    function GetLocation() {
        console.log(navigator.geolocation);
        if (navigator.geolocation) {
            console.log("in get location");
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            document.getElementById("p").innerHTML = "Geo;ocation is not supported";
        }
    };

    function showPosition(position) {
        var x = document.getElementById('p');
        var y = document.getElementById("BTN");
        x.innerHTML = "Latitude: " + position.coords.latitude
            + "longtitide: " + position.coords.longitude;
    }

//enable
    function enableCreateUser() {
        if (document.getElementById("location").checked) {
            document.getElementById("city").disabled = true;
        }
        if (!document.getElementById("location").checked) {
            document.getElementById("city").disabled = false;
        }
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
            document.getElementById("message").innerHTML = "Password length must be atleast 8 characters";
            return false;
        }

        //maximum length of password validation
        if (password.length > 15) {
            document.getElementById("message").innerHTML = "Password length must not exceed 15 characters";
            return false;
        } else {
            alert("Password is correct");
        }

        var email = document.getElementById("email").value;
        if (email == "") {
            document.getElementById("message").innerHTML = "Fill the email please!";
            return false;
        } else {
            alert("email is correct");
        }

        var FullName = document.getElementById("FullName").value;
        if (FullName == "") {
            document.getElementById("message").innerHTML = "Fill the User Name please!";
            return false;
        } else {
            alert("User Name is correct");
        }
    }


    //check passwords are same
    function validateForm() {
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        if (password1 != password2) {
            alert("Passwords are not same")
            return false;
        } else {
            alert("Your password created successfully");
        }
    }


     
  