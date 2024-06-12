const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const fileEmojiTranslator = {
    "au.mp3": "🇦🇺",
    "uk.mp3": "🇬🇧",
    "us.mp3": "🇺🇸",
}

$("#search").on("submit", function (event) {
    let word = $("#word").first().val();
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

        $(".def").remove();


        if (data["title"] == "No Definitions Found") {
            $("#status").html(`<h2>no definitions found for: ${word}</h2>`);
            return;
        }

        $("#status").html(`<h2>definitions for: ${word}</h2>`).show();

        for (let index = 0; index < data.length; index++) {
            generateWordDefinitionHtml(data[index], index);
        }


    } catch (err) {
        $("#status").html(`<h2>error getting data: ${err}</h2>`);
    }

}

function generateWordDefinitionHtml(definition, index) {
    let id = `def_${index}`;

    $("#definitions").append(`<div class="def" id="${id}">${index + 1}: ${definition["word"]} ${generatePhoneticsLinks(definition["phonetics"])}</div>`).show();

    for (let meaning of definition["meanings"]) {
        let partOfSpeech = meaning["partOfSpeech"];

        meaningDefinitions = [];

        for (let def of meaning["definitions"]) {
            meaningDefinitions.push(def["definition"]);
        }

        let listElementsAsString = meaningDefinitions
            .map((def) => `<li>${def}</li>`)
            .reduce((acc, current) => acc + current, "",);

        $(`#${id}`).append(`<div class="meaning"><p>(${partOfSpeech}):</p><ul>${listElementsAsString}</ul></div>`).show();


    }

}

function generatePhoneticsLinks(phonetics) {

    let phoneticLinks = []

    for (let phoneticData of phonetics) {

        let text = phoneticData["text"];

        if (text == undefined) {
            continue;
        }

        let audioLink = phoneticData["audio"];

        if (audioLink === "") {
            let phoneticTextSpan = `<span>${text}</span>`;
            phoneticLinks.push(phoneticTextSpan);
        }

        let countryEmoji = "";

        let countryIndicator = audioLink.slice(-6);

        countryEmoji = fileEmojiTranslator[countryIndicator];

        if(countryEmoji == undefined){
            continue;
        }

        let phoneticLink = `<a href="${audioLink}">${text} [${countryEmoji}]</a>`;
        phoneticLinks.push(phoneticLink);
    }

    return phoneticLinks.join(" | ");
}