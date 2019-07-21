// Array of artists that are used to create buttons
var artists = ['John Coltrane', 'John Legend', 'John Mayer', 'Duke Ellington', 'Tupac'];

// API Request Parameters
var apiKey = 'CADm0V2ObtC7MT6i0hWmGFhcSemeIsIs';
var userInput;

// FUNCTION that converts any string to title case => "This Is Title Case"
function toTitleCase(word)
{
    var wordArray = word.toLowerCase().split(' '); // returns an array object

    for (let i=0; i < wordArray.length; i++)
    {
        wordArray[i] = wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1);
    }
    return wordArray.join(' ');
}


$(document).ready(generateButtons()); // WHEN THE DOCUMENT FINISHED LOADING, GENERATE BUTTONS FOR WORD IN ARTIST ARRAY


// FUNCTION that generates buttons with artist names and includes an on click event for those buttons
function generateButtons()
{
 for (let i = 0; i < artists.length; i++)
    {
        $('.buttons').append(`<button> ${artists[i]}</button>`);
    }

 $('.buttons button').on('click', function()
    {
        let artistName = $(this)[0].innerText.trim();
        ajaxRequest(artistName);
    });
}


// On click event for SUBMIT button
$('#btn-submit').on('click', function()
{
    userInput = toTitleCase($('#search').val());

    if (userInput.length === 0) //  CHECK TO SEE IF THE USER HITS SUBMIT WITHOUT TYPING A WORD INTO THE INPUT BOX
    {
        $('#warning').html('<h3>Please enter a word before submitting</h3>').css({'font-size': '14px', 'color': '#ff0000 '});
    }
    else
    {
        if (!artists.includes(userInput))  // CHECK TO SEE IF userInput IS NOT IN THE ARRAY
        {
           artists.push(userInput); // APPEND THE USERS INPUT TO THE ARTISTS ARRAY
        }

        $('.buttons').empty(); // REMOVE BUTTONS FROM ARTIST BUTTONS DIV

        $('#search').val('').focus(); // CLEAR INPUT BOX TEXT FOR NEW SEARCH AND LEAVE THE USER IN THE INPUT BOX

        generateButtons(); // GENERATE THE BUTTONS WITH THE ARTISTS NAMES

        $('#warning').empty(); // CLEAR WARNING MESSAGE GENERATED WHEN THE SUBMIT BUTTON IS PRESSED WITH NO TEXT INPUT

        ajaxRequest(userInput);
    }
});

// FUNCTION that sends the ajax request to the API, it then creates the html to show the returned images and ratings
// An on click event is created for all images
function ajaxRequest(artistName)
{
    // GIF API URL
    var queryUrl = `https://api.giphy.com/v1/gifs/search?q=${artistName}&api_key=${apiKey}&limit=10`;
    $.ajax({
            method: "GET",
            url: queryUrl
        }).then(function(response)
        {
            $('#gif-images').empty();
            for (let i = 0; i < response.data.length; i++)
            {
                let gifStill = response.data[i].images.fixed_width_still.url;
                let gif = response.data[i].images.fixed_width.url;
                let imageRating = response.data[i].rating.toUpperCase();

                $('#gif-images').prepend('<span>Rating: ' + imageRating + '<img src="' + gifStill
                            + '" data-still="' + gifStill
                            + '" data-moving="' + gif
                            + '" data-state="still"'
                            + '"></span>');
            }

            $('#gif-images img').on('click', function()
            {
                let imageState = $(this).attr('data-state');
                if (imageState === 'still')
                {
                    $(this).attr('src', $(this).attr('data-moving')).attr('data-state', 'moving')
                }
                else
                {
                    $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still')
                }
            });
        })
}
