const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require('request');

//routes
app.get("/", async function (req, res) {
    //predefined array of keywords
    const queryArray = new Array('dogs', 'cats', 'horses', 'california');
    //shuffle the array to get random search query
    function getRandomArrayElement(arr) {
        let min = 0;
        let max = (arr.length);
        let randIndex = Math.floor(Math.random() * (max - min)) + min;
        return arr[randIndex];
    }

    function randomizedSearch() {
        return getRandomArrayElement(queryArray);
    }
    console.log(randomizedSearch)   
    let keyword = randomizedSearch();
    let orientation = 'all';
    let parsedData = await getImages(keyword, orientation);
    console.dir("parsedData: " + parsedData); //displays content of the object
    res.render("index", {"images":parsedData});
            
}); //root route


app.get("/results", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let orientation = req.query.orientation
    let parsedData = await getImages(keyword, orientation);

    res.render("results", {"images":parsedData});
    
});//results route

//shuffle the array of results
const shuffle = array => {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * (i + 1));
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
}

//Returns all data from the Pixabay API as JSON format
function getImages(keyword, orientation) {
    return new Promise( function(resolve, reject){
        request(`https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=${keyword}&orientation=${orientation}`,
        function (error, response, body) {
            if (!error && response.statusCode == 200  ) { //no issues in the request
                    let parsedData = JSON.parse(body); //converts string to JSON
                    parsedData.hits = shuffle(parsedData.hits);
                    resolve(parsedData);
                
                // let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                // response.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                // response.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});
                
                } else {
                    reject(error);
                    console.log(response.statusCode);
                    console.log(error);
                }
          });//request
    });
    
}


//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});