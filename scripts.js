$(function () {
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

    $.ajax({
        type: "GET",
        url: "https://pixabay.com/api/",
        dataType: "json",
        data: {
            "key": "13809305-ec11020f56e7e390c200ef099",
            "q": randomizedSearch,
            "image_type": "photo"
        },
        success: function (result, status) {
            console.log(result);
            result.hits = _.shuffle(result.hits);

            for (let i = 0; i < 4; i++) {
                // console.table(result.hits[i].webformatURL);
                $("#imgs__wrapper").append(`
                <div class="img__wrapper">
                <p class="imgs__caption">Likes: ${result.hits[i].likes}</p>
                <img class="imgs" src="${result.hits[i].webformatURL}">
                </div>`)
            }
            // webformatURL;

        },
        complete: function (result, status) { //optional, used for debugging purposes
            //alert(result);
        }
    });//ajax


    document.getElementById('submit').addEventListener('click', submitSearch);

    function submitSearch() {
        searchQuery = document.getElementById(`searchQuery`).value;
        orientationValue = document.getElementById(`orientation`).value;

        randomizedSearch;
        $("#imgs__wrapper").html('');




        if (searchQuery == '') {
            searchQuery = randomizedSearch;
        }
        $.ajax({
            type: "GET",
            url: "https://pixabay.com/api/",
            dataType: "json",
            data: {
                "key": "13809305-ec11020f56e7e390c200ef099",
                "q": searchQuery,
                "orientation": orientationValue,
                "image_type": "photo"
            },
            success: function (result, status) {
                result.hits = _.shuffle(result.hits)
                console.log(result);
                for (let i = 0; i < 4; i++) {
                    // console.table(result.hits[i].webformatURL);
                    $("#imgs__wrapper").append(`
                    <div class="img__wrapper ${orientationValue}">
                    <p class="imgs__caption">Likes: ${result.hits[i].likes}</p>
                    <img class="imgs" src="${result.hits[i].webformatURL}">
                    </div>`)
                }
                // webformatURL;

            },
            complete: function (result, status) { //optional, used for debugging purposes
                //alert(result);
            }
        });//ajax

    }




});