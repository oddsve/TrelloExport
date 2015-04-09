var onAutorize = function() {
  Trello.rest("GET","boards/532169c1348424717a6298f5/lists/", function(lister){

    $.each(lister, function(indx, liste){


      $("#lister").append("<h2 id='h"+ liste.id +"'>"+ liste.name +"</h2><div id='" + liste.id + "'></div>");
      $("#h" + liste.id).addClass("hidden");

      Trello.rest("GET","lists/" + liste.id + "/cards", function(cards){

        $.each( cards, function(indx, card){
          $("#h" + liste.id).removeClass("hidden");
          $("#"+liste.id).append("<h3>" + card.name + "</h3>");
          if (card.due != null ) {
            $("#"+liste.id).append("<p class='frist'>Frist: <span class='dato'> " + moment(card.due, "YYYY-MM-DDTHH:mm:ssZ").format("D. MMM YYYY") + "</span></p>");
          }
          $("#"+liste.id).append("<div id=" + card.id + " class='beskrivelse'></div>");
          $("#"+card.id ).append(marked(card.desc) );
          $.each( card.labels , function (indx, label){
            $("#"+liste.id).append("<p class='trello-label " + label.color + "'>" + label.name + "</p>")
          });


        });
      });
    });
  });
};


var onError = function(){
  alert("Error");
};

$("#get-board").click(function(){
  Trello.authorize({name: "TrelloExport", type: "popup", success: onAutorize, error: onError, account:true  })
});

$("#log-out").click(function(){
  Trello.deauthorize();
});