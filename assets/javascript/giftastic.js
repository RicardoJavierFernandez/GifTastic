// Array of artists that are used to create buttons
var artists = ['John Coltrane', 'John Mayer', 'Bill Evans', 'Duke Ellington', 'Tupac'];

$(document).ready(generateButtons());

// FUNCTION generates buttons with artist names and includes on click event for those buttons
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

// API Request Parameters
var apiKey = 'CADm0V2ObtC7MT6i0hWmGFhcSemeIsIs';
var userInput;

// On click event for SUBMIT button
$('#btn-submit').on('click', function()
{
    userInput = $('#search').val();

    if (userInput.length === 0)
    {
        $('#warning')
            .html('<h3>Please enter a word before submitting</h3>')
            .css({'font-size': '14px', 'color': '#ff0000 '});
    }
    else
    {

        if (!artists.includes(userInput))  // CHECK TO SEE IF userInput IS NOT IN THE ARRAY
        {
           artists.push(userInput); // APPEND THE USERS INPUT TO THE ARTISTS ARRAY
        }

        $('.buttons').empty(); // REMOVE BUTTONS FROM ARTIST BUTTONS DIV

        $('#search').val(''); // CLEAR INPUT BOX TEXT FOR NEW SEARCH

        generateButtons(); // GENERATE THE BUTTONS WITH THE ARTISTS NAMES

        $('#warning').empty(); // CLEAR WARNING MESSAGE GENERATED WHEN THE SUBMIT BUTTON IS PRESSED WITH NO TEXT INPUT

        ajaxRequest(userInput);
    }
});

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
                let gifImage = response.data[i].images.fixed_width_still.url;
                let gif = response.data[i].images.fixed_width.url;
                let imageRating = response.data[i].rating;
                $('#gif-images')
                    .prepend('<img src="' + gifImage
                            + '" data-still="' + gifImage
                            + '" data-moving="' + gif
                            + '" data-state="still"'
                            + '">')
                    .prepend('<p> Rating: ' + imageRating + '</p>');
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






