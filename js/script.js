$( "#search" ).on( "submit", function( event ) {
    let word = $( "#word" ).first().val()
    $( "#definitions" ).text( `definitions for: ${word}` ).show();
    event.preventDefault()
    return;
  });