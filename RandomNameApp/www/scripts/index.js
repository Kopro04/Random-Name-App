/**
 * @file Retreive a list of random names from a backend service and filter the data
 * based on user supplied search queries and sorting preferences.
 * 
 * @author Michael Koprowski
 */


/**
 * Core Cordova functions.
 */

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
    };

    function onPause() {};

    function onResume() {};
})();

var allNames = [];  // Complete list of JSON names
var resultSet = []; // JSON names that matching the user's search query

var searchBar = document.getElementById("searchBar");
var sortOptions = document.getElementById("sortOptions");
var namesBtn = document.getElementById("namesBtn");
var nameList = document.getElementById("nameList");

searchBar.addEventListener("keyup", search);
searchBar.addEventListener("search", search);
sortOptions.addEventListener("change", sort);


/**
 * Uncomment to use Ajax to retreive the list of names directly from the
 * http://uinames.com api. This api is ultimately used to power the backend
 * service that follows.
 */

/*namesBtn.addEventListener("click", () => {
    $.getJSON("http://uinames.com/api/?amount=100", function (data) {
        allNames = data;
        searchBar.innerHTML = "";
        sort();
        displayNames(allNames);
    });
});*/


/**
 * Binds Ajax command that consumes a list of random names from the backend service
 * to a button click event. This service is powered by the http://uinames.com api.
 */

namesBtn.addEventListener("click", () => {
    $.getJSON("http://localhost:8080/RandomNameAPI/webapi/names", function (data) {
        allNames = data;
        searchBar.value = "";
        sort();
        displayNames(allNames);
    });
});


/**
 * Parses a set of JSON name objects for display a HTML view
 * @param {any} nameSet - a set of JSON name objects
 */

function displayNames(nameSet) {
    if (allNames.length === 0)  // The root list of names is empty
        nameList.innerHTML = "<p>Please generate some names.</p>";
    else if (nameSet.length === 0)  // No name match the search query
        nameList.innerHTML = "<p>No matches found.</p>";
    else {
        var formatNames = "";

        // Parse name objects to HTML
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

        nameList.innerHTML = formatNames;
    }
}


/**
 * Filter the list of names by comparing the user's search query with the
 * object's name, surname, and region. A name object's gender is ignored.
 */
function search() {
    resultSet = [];
    var query = searchBar.value;
    query = query.toLowerCase();

    // Empty query displays the entire name set
    if (query === "") resultSet = allNames;
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


/**
 * Identifies the selected sort preference and initiates the proper sort
 * algorithm. If no preference has been selected the results are sorted
 * by first name.
 */

function sort() {
    var sortBy = sortOptions.value;

    if (sortBy === "lname") sortByLname();
    else if (sortBy === "gender") sortByGender();
    else if (sortBy === "region") sortByRegion();
    else sortByFname();
}


/**
 * Sorts the name objects by first name. Secondary sort criteria is last name.
 */

function sortByFname() {
    if (allNames !== null && allNames.length > 0) {
        allNames.sort((a, b) => {
            var valA = a.name.toLowerCase();
            var valB = b.name.toLowerCase();

            var secA = a.surname.toLowerCase();
            var secB = b.surname.toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;

            if (secA < secB) return -1;
            if (secA > secB) return 1;

            return 0;
        });
        search();
    }
}


/**
 * Sorts the name objects by last name. Secondary sort criteria is first name
 */

function sortByLname() {
    if (allNames !== null && allNames.length > 0) {
        allNames.sort((a, b) => {
            var valA = a.surname.toLowerCase();
            var valB = b.surname.toLowerCase();

            var secA = a.name.toLowerCase();
            var secB = b.name.toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;

            if (secA < secB) return -1;
            if (secA > secB) return 1;

            return 0;
        });
        search();
    }
}


/**
 * Sorts the name objects by gender. Secondary and tertiary sort criteria are
 * first name and last name respectively
 */

function sortByGender() {
    if (allNames !== null && allNames.length > 0) {
        allNames.sort((a, b) => {
            var valA = a.gender.toLowerCase();
            var valB = b.gender.toLowerCase();

            var secA = a.name.toLowerCase();
            var secB = b.name.toLowerCase();

            var terA = a.surname.toLowerCase();
            var terB = b.surname.toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;

            if (secA < secB) return -1;
            if (secA > secB) return 1;

            if (terA < terB) return -1;
            if (terA > terB) return 1;

            return 0;
        });
        search();
    }
}


/**
 * Sorts the name objects by region. Secondary and tertiary sort criteria are
 * first name and last name respectively
 */

function sortByRegion() {
    if (allNames !== null && allNames.length > 0) {
        allNames.sort((a, b) => {
            var valA = a.region.toLowerCase();
            var valB = b.region.toLowerCase();

            var secA = a.name.toLowerCase();
            var secB = b.name.toLowerCase();

            var terA = a.surname.toLowerCase();
            var terB = b.surname.toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;

            if (secA < secB) return -1;
            if (secA > secB) return 1;

            if (terA < terB) return -1;
            if (terA > terB) return 1;

            return 0;
        });
        search();
    }
}