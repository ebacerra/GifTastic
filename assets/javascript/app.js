$(document).ready(function () {

    // created an array of my topics 
    var tvSeries = ["Walking Dead", "Game Of Thrones", "Stranger Things", "The Big Bang Theory"];


    // created a an input functions not sure if this is working :(
    $("#inputTitle").on("click", function (event) {
        event.preventDefault();
        tvSeries = $("#inputTitle").val().trim();
        tvSeries.push(tvSeries);

    });


    // when the buttons are clicked, 10 images will pop up
    $("button").on("click", function () {
        var tvSeries = $(this).attr("data-tvSeries");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvSeries + "&api_key=dc6zaTOxFJmzC&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {

                    // creating a paragraphed for the rating
                    var rating = results[i].rating;
                    // creating a paragraphed for the rating
                    var p = $("<p>").text("Rating: " + rating);
                    var tvSeriesDiv = $("<div>");
                    var tvSeriesImage = $("<img>");

                    tvSeriesDiv.addClass("col-md-12");
                    tvSeriesImage.addClass("gif")

                    $(".gif").wrap('<span style="display:inline-block"></span>');


                    tvSeriesImage.attr("src", results[i].images.fixed_height.url);
                    tvSeriesImage.attr("data-still", results[i].images.fixed_height_still.url);
                    // ["480w_still"]
                    tvSeriesImage.attr("data-animate", results[i].images.fixed_height.url);
                    tvSeriesImage.attr("data-state", "animate");
                    tvSeriesDiv.append(p);
                    tvSeriesDiv.append(tvSeriesImage);

                    $("#gifs-appear-here").prepend(tvSeriesDiv);
                }
            });

        // setting the images to paused
        $(document).on("click", ".gif", function () {
            console.log("clicked")
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }


        });
    });

});