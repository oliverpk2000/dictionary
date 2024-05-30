const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

$("#search").on("submit", function (event) {
    let word = $("#word").first().val();
    $("#status").html(`<h2>definitions for: ${word}</h2>`).show();
    $("#definitions").empty();
    loadWordDefinitions(word);
    event.preventDefault();
    return;
});

async function loadWordDefinitions(word) {
    let completeUrl = baseUrl + word;

    try {
        const response = await fetch(completeUrl);
        const data = await response.json();

        console.log(data.length);

        for (let index = 0; index < data.length; index++) {
            console.log(data[index]);
            generateWordDefinitionHtml(data[index], index);
        }

    } catch (err) {
        $("#status").html(`<h2>error getting data: ${err}</h2>`);
    }

}

function generateWordDefinitionHtml(definition, index) {
    let id = `def_${index}`;

    console.log(id);

    $("#definitions").append(`<div>${index + 1}: ${definition["word"]}</div>`).attr({
        "class": "def",
        "id": id
    }).show();


    for (let meaning of definition["meanings"]) {
        let partOfSpeech = meaning["partOfSpeech"];

        meaningDefinitions = [];

        for (let def of meaning["definitions"]) {
            meaningDefinitions.push(def["definition"]);
        }

        let listElementsAsString = meaningDefinitions
            .map((def) => `<li>${def}</li>`)
            .reduce((acc, current) => acc + current, "",);

        $(`#${id}`).append(`<div><p>(${partOfSpeech}):</p><ul>${listElementsAsString}</ul></div>`).attr({
            "class": "meaning",

        }).show();


    }

}