$(document).ready(function () {

  var appId = "fb64e6f4";



  var apiKey = "ca1d2e84cd055e2aea3d2b71186fa559";



  var recipe = "";

  var recipeNum = 0; 

  console.log(recipeNum);



  $("#recipeClick").on("click", function () {

    

    toggleRecipe();



  });



  $("#restaurantClick").on("click", function () {



    toggleRestaurant();



  });





  $(".recipe-item").on("click", function () {



    $("#recipeSearchBar").val($(this).val());



  });







  $("#recipeUserSubmit").on("click", function (e) {

    event.preventDefault(e);

    recipe = $("#recipeSearchBar").val();

    console.log(recipe);


    $("#resultDiv").text("");


    $.ajax({

      method: "GET",

      url:

        "https://api.edamam.com/search?q=" +

        recipe +

        "&app_id=" +

        appId +

        "&app_key=" +

        apiKey,

      dataType: "json",

      success: function (result) {

        console.log(result);

	      if(recipeNum > 4){
  	    recipeNum = 0;
  	    }

        displayObjectArry(result, recipeNum);
	
	      recipeNum++;

      }, error: function () {

        console.log("error");

      }

    });

  });

});



// function displayObjectArry(object) {

//   var recipeShenan = $("<ul>");

//   var recipeImg = $("<img src='" + object.hits[0].recipe.image + "'>");

//   for (var i = 0; i < object.hits[0].recipe.ingredients.length; i++) {

//     var recipeLi = $("<li>")

//     recipeLi.html(object.hits[0].recipe.ingredients[i].text);

//     $(recipeShenan).append(recipeLi);

//      }

//     $("#resultDiv").append(recipeImg);

//     $("#resultDiv").append(recipeShenan);

// };

function displayObjectArry(object, recipeNum) {

  var newRow = $("<div>").attr("class", "row bg-light text-center");
  var recipeImg = $("<img src='" + object.hits[recipeNum].recipe.image + "' class='border border-dark'>");
  var newColumn = $("<div>").attr("class", "col-6");
  var secondNewColumn = $("<div>").attr("class", "col-6");

  for (var i = 0; i < object.hits[recipeNum].recipe.ingredients.length; i++) {


    
    var ingredient = object.hits[recipeNum].recipe.ingredients[i].text;
    console.log(ingredient);
    
    var textHolder = $("<p>");
    
    $(textHolder).html(ingredient);
    $(newColumn).append(textHolder);
    

  }
  
  var recipeTitle = object.hits[recipeNum].recipe.label;

  var recipeTitleHolder = $("<h1>").attr("class", "col-12 text-center recipeTitleHolder pb-5");

  $(recipeTitleHolder).html(recipeTitle);

  $(".recipeTitleHolder").remove();

  $(newRow).append(recipeTitleHolder);

  $("#resultDiv").append(newRow);
  $(newRow).append(secondNewColumn)
  $(secondNewColumn).append(recipeImg);
  $(newRow).append(newColumn);
};



function toggleRecipe() {



  var x = document.getElementById("recipeSearchBox");

  var y = document.getElementById("restaurantSearchBox");



  if (x.style.display === "none") {

    x.style.display = "block";

  } else if (x.style.display === "block") {

    x.style.display = "none";
    $("#resultDiv").text("");

  }



  y.style.display = "none";



}





function toggleRestaurant() {





  var x = document.getElementById("recipeSearchBox");

  var y = document.getElementById("restaurantSearchBox");



  if (y.style.display === "none") {

    y.style.display = "block";
    $("#resultDiv").text("");

  } else {

    y.style.display = "none";
    $("#resultDiv").text("");

  }



  x.style.display = "none";





}
