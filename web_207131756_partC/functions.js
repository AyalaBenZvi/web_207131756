const sql = require("./db");

// function that get distance in km from lat&lan
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        console.log(d);
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }


// function that check the current time and wait until the logoutTime arrive and then sent the user to the home page, update the login boolean
function checkLoginStatus(logoutTime) {
  let isUserLoggedIn = true;

  setInterval(function() {
    let currentTime = new Date().getTime();
    if (currentTime >= logoutTime) {
      isUserLoggedIn = false;
      // alert("Your login time has passed. You will now be logged out.");
      window.location.href = "/";
    }
  }, 1000);
  return isUserLoggedIn;
}



module.exports = {getDistanceFromLatLonInKm, checkLoginStatus}