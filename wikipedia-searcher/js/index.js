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
          $(".content").append("<div id='no-results' class='col-xs-12'><h2>No search results found, please try again</h2></div>");
          $(".content").slideDown();
        } else {
          $("#welcome").hide();
          for (var pageID in articles.query.pages) {
            //this gets the page ids (the value of properties within pages)
            // this is a nice to have alert(articles.query["pages"][x]["images"][0]["title"]);

            $(".content").append("<div class='row article-div'><div class='col-xs-1'><h2 class='selected'>*</h2></div><a href='" +
              articles.query["pages"][pageID]["fullurl"] +
              "' target='blank'><div class='article-content col-xs-10'><p><b>" +
              articles.query["pages"][pageID]["title"] +
              "</b></p><p>" +
              articles.query["pages"][pageID]["extract"] +
              "</p><p class='readmore'>Click to learn more</p></div></a></div>");

            $(".selected").hide();

            $(".article-div").mouseenter(function () {
              $("h2.selected", this).show();
              $(".readmore", this).css("font-weight", "bold");
            });

            $(".article-div").mouseleave(function () {
              $("h2.selected", this).hide();
              $(".readmore", this).css("font-weight", "normal");
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
Learn to access the image from each entry
Let user choose how many results to see
Nice to haves from API:
Learn about action=raw to get wiki markup
learn about different article descriptions I can get*/