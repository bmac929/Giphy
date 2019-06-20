
var movies = ["Inception", "Goodfellas", "Training Day", "Wedding Crashers"];

function alertMovieName() {
    var movieName = $(this).attr("data-name");

}

function renderButtons() {

    $("#buttonDiv").empty();


    for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
        a.addClass("movie");
        a.attr("data-name", movies[i]);
        a.text(movies[i]);
        $("#buttonDiv").append(a);
    }
}

$("#add-movie").on("click", function (event) {

    event.preventDefault();
    var movie = $("#user-input").val().trim();
    movies.push(movie);
    renderButtons();


});



$(document).on("click", ".movie", alertMovieName);
renderButtons();

$("#buttonDiv").on("click", function () {

    $("button").on("click", function () {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            $(this).attr("data-name") + "&api_key=nHL0xVLalLXQUye3hrBT0kE4T9Gll9G1&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                var results = response.data;


                for (var i = 0; i < results.length; i++) {
                    var movieDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var movieImage = $("<img>");
                    movieImage.addClass("gif");
                    movieImage.attr("data-state", "still");
                    var state = $(this).attr("data-state");

                    movieImage.attr("src", results[i].images.fixed_height.url);
                    movieDiv.append(p);
                    movieDiv.append(movieImage);
                    $("#gifDiv").prepend(movieDiv);

                    $(".gif").on("click", function () {
                        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                        var state = $(this).attr("data-state");
                        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                        // Then, set the image's data-state to animate
                        // Else set src to the data-still value
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });





                }
            });
    });
});