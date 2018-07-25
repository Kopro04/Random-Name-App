// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
    };

    function onPause() {};

    function onResume() {};
})();

var allNames = [];
var resultSet = [];

document.getElementById("searchBar").addEventListener("keyup", search);
document.getElementById("searchBar").addEventListener("search", search);
document.getElementById("sortOptions").addEventListener("change", sort);

document.getElementById("genNames").addEventListener("click", function () {
    $.getJSON("http://uinames.com/api/?amount=25", function (data) {
        allNames = data;
        sort();
        displayNames(allNames);
    });
});

function displayNames(nameSet) {
    if (nameSet === null)
        document.getElementById("nameList").innerHTML = "<p>Please generate some names.</p>";
    else if (nameSet.length === 0)
        document.getElementById("nameList").innerHTML = "<p>No matches found.</p>";
    else {
        var formatNames = "";
        for (var i = 0; i < nameSet.length; i++) {
            formatNames += "<div><p>";
            formatNames += "<span class='name'>" + nameSet[i].name + " " + nameSet[i].surname +
                "<br></span>";

            if (nameSet[i].gender === "male")
                formatNames += "<span class='gender'>Gender: <span class='male'>";
            else
                formatNames += "<span class='gender'>Gender: <span class='female'>";
            formatNames += nameSet[i].gender + "</span></span>";

            formatNames += "<span class='region'> Region: " + nameSet[i].region + "</span>";

            formatNames += "</p></div>";
        }
        document.getElementById("nameList").innerHTML = formatNames;
    }
}

function search() {
    resultSet = [];
    var query = document.getElementById("searchBar").value;
    query = query.toLowerCase();

    if (query.replace(/\s+/g, '') === "") resultSet = allNames;
    else {
        for (var i = 0; i < allNames.length; i++) {
            if (allNames[i].name.toLowerCase().includes(query) ||
                allNames[i].surname.toLowerCase().includes(query) ||
                allNames[i].region.toLowerCase().includes(query)) {
                resultSet.push(allNames[i]);
            }
        }
    }
    displayNames(resultSet);
}

function sort() {
    var sortBy = document.getElementById("sortOptions").value;

    if (sortBy === "fname") sortByFname();
    else if (sortBy === "lname") sortByLname();
    else if (sortBy === "gender") sortByGender();
    else if (sortBy === "region") sortByRegion();
}

function sortByFname() {
    if (allNames !== null && allNames.length > 0) {
        allNames.sort(function (a, b) {
            var valA = a.name.toLowerCase();
            var valB = b.name.toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });
        search();
    }
}

function sortByLname() {
    if (allNames !== null && allNames.length > 0) {
        allNames.sort(function (a, b) {
            var valA = a.surname.toLowerCase();
            var valB = b.surname.toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });
        search();
    }
}

function sortByGender() {
    if (allNames !== null && allNames.length > 0) {
        allNames.sort(function (a, b) {
            var valA = a.gender.toLowerCase();
            var valB = b.gender.toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });
        search();
    }
}

function sortByRegion() {
    if (allNames !== null && allNames.length > 0) {
        allNames.sort(function (a, b) {
            var valA = a.region.toLowerCase();
            var valB = b.region.toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });
        search();
    }
}