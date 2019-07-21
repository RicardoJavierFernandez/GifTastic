// Array of artists that are used to create buttons
var artists = ['John Coltrane', 'John Mayer', 'Bill Evans', 'Duke Ellington', 'Tupac'];

$(document).ready(generateButtons());

// FUNCTION generates buttons with artist names
function generateButtons()
{
 for (let i = 0; i < artists.length; i++)
    {
        $('.buttons').append(`<button> ${artists[i]}</button>`);
    }
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
        // Append the user's input to the artists array
        if (!artists.includes(userInput))
        {
           artists.push(userInput);
        }
        // REMOVE BUTTONS FROM ARTIST BUTTONS
        $('.buttons').empty();

        // CLEAR INPUT BOX TEXT FOR NEW SEARCH
        $('#search').val('');

        // GENERATE THE BUTTONS WITH THE ARTISTS NAMES
        generateButtons();

        // CLEAR THE WARNING MESSAGE GENERATED WHEN THE SUBMIT BUTTON IS PRESSED WITH NO TEXT INPUT
        $('#warning').empty();

        // GIF API URL
        var queryUrl = `https://api.giphy.com/v1/gifs/search?q=${userInput}&api_key=${apiKey}&limit=10`;

        ajaxRequest(queryUrl);

        // $.ajax({
        //     method: "GET",
        //     url: queryUrl
        // }).then(function(response)
        // {
        //     $('#gif-images').empty();
        //     for (let i = 0; i < response.data.length; i++)
        //     {
        //         let gifImage = response.data[i].images.fixed_width_still.url;
        //         // let rating = response.data
        //
        //         $('#gif-images').prepend('<img src="' + gifImage  + '">');
        //         console.log(response.data[i]);
        //     }
        //
        // })
    }
});

function ajaxRequest(urlParam)
{
        $.ajax({
            method: "GET",
            url: urlParam
        }).then(function(response)
        {
            $('#gif-images').empty();
            for (let i = 0; i < response.data.length; i++)
            {
                let gifImage = response.data[i].images.fixed_width_still.url;
                let imageRating = response.data[i].rating;
                $('#gif-images').prepend('<p> Rating: ' + imageRating + '</p>');
                $('#gif-images').prepend('<img src="' + gifImage  + '">');
                console.log(response.data[i]);
            }

        })
}






