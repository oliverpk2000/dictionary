const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

$( "#search" ).on( "submit", function( event ) {
    let word = $( "#word" ).first().val();
    $( "#status" ).html( `<h2>definitions for: ${word}<h2>` ).show();
    getWordDefinition(word);
    event.preventDefault();
    return;
  });

function getWordDefinition(word){
    let completeUrl = baseUrl + word;
    $.get(completeUrl, function(data, status){
        console.log(data);
        console.log(status);
      });
}