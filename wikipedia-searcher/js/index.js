$(document).ready(function () {
  function getSearch() {
    var searchTerm = encodeURI($("#searcher").val()); //convert searchTerm spaces and special characters
    var number = 10;
    var wikiData = "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrlimit=" +
      number + "&prop=info%7Cextracts&exintro&explaintext&exsentences=3&exlimit=max&inprop=url&gsrsearch=" + searchTerm + "&callback=?"

    //images start with "https://en.wikipedia.org/wiki/File:"

    $(".content").hide();

    $.getJSON(wikiData, function (articles) {

      $(".content").empty();

      function writeResults() {
        if (articles.hasOwnProperty("query") == false) {
          $(".content").append("<div id='no-results' class='container'><h2>No search results found, please try again</h2></div>");
          $(".content").slideDown();
        } else {
          $("#intros").hide();
          for (var pageID in articles.query.pages) {
            //this gets the page ids (the value of properties within pages)

            var excerpt;
            var maxChar;

            window.innerHeight <= 500 || window.innerWidth <= 450 ? maxChar = 100 : maxChar = 250;

            (articles.query["pages"][pageID]["extract"]).length >= 80 ?
            excerpt= (articles.query["pages"][pageID]["extract"]).slice(0, maxChar) + "..." :  excerpt=articles.query["pages"][pageID]["extract"];

            $(".content").append("<div class='article-div'><div class='article-content'><p><b>" +
              articles.query["pages"][pageID]["title"] +
              "</b></p><p>" + excerpt +
              "</p><p class='readmore'><a href='" +
              articles.query["pages"][pageID]["fullurl"] +
              "' target='blank'>Click to learn more</a></p></div></div>");

            $(".article-div").mouseenter(function () {
              $(".readmore", this).css("text-decoration", "underline");
              $(".readmore a", this).css({"background-color": "#B3E5FC","box-shadow":"1px 2px 2px rgba(0, 0, 0, .29)"});
  
            });

            $(".article-div").mouseleave(function () {
              $(".readmore", this).css("text-decoration", "none");
              $(".readmore a", this).css({"background-color":"white","box-shadow": "none"});
            });

            $(".content").slideDown();
          }
        }
      }

      writeResults();

    });

  }

  $("#beginSearch").click(function () {
    getSearch();
  });

  $("#searcher").keypress(function (e) {
    if (e.keyCode == 13) { //if the key is ascii 13= enter
      getSearch();
    }
  });

  $("#random").click(function () {
    window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
  });

});

/*Nice to haves:
Bonus User Story: as they type,they see a dropdown for autocomplete option with matching wikipedia entries
Learn to access the image from each entry articles.query["pages"][x]["images"][0]["title"];
Let user choose how many results to see
Nice to haves from API:
Learn about action=raw to get wiki markup
learn about different article descriptions I can get*/