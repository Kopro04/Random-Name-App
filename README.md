# RandomNameApp
This is a cross-platfrom app that manages a list of name data. At the press of a button, this app retreives a 
list of random names from an web service that is ultimately powered by [uinames.com](http://uinames.com) and 
displays the names in an orderly fashion. The user has the option to filter the names that are displayed using
a search query and sort the results of the query by the first name, last name, gender or region. At any time 
the user may generate a new set of names to experiment with.

### How to Use
This is an Apache Cordova app which can be run on Android, iOS, Windows, Amazon, etc. devices as well as most 
standard browsers. The index.js file can be edited to either use the RandomNameAPI that I developed which ultimately
fetches data from [uinames.com](http://uinames.com) or directly access the [uinames.com](http://uinames.com) api.
Both methods are accomplished using ajax.

Once the app loads, the user the user can press the "Generate Names" button to get a list of names. Then the names
can be filtered by entering a query into the search field. The results will be dynamically changed with each keyup.
Additionally, at any time the list can be sorted alphabetically by first name, last name, gender or region using 
the "Sort by"dropdown menu.

### Built With
- **Apache Cordova** - cross-platform mobile app development framework
- **HTML/JavaScript/CSS** - development languages
- **Ajax** - asynchronous web development technique
- **[uinames.com](http://uinames.com)** - external API and ultimate source of name data
