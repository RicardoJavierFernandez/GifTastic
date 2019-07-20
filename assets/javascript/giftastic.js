// Array of words that are used to create buttons
var words = ['John Coltrane', 'John Mayer', 'Bill Evans', 'Duke Ellington', 
            'Tupac'];

for (let i = 0; i < words.length; i++)
{
    $('.buttons').append(`<button> ${words[i]}</button>`);
}



// Request Parameters
var apiKey = 'CADm0V2ObtC7MT6i0hWmGFhcSemeIsIs';
var userInput = '';

// On click event for button
$('#btn-submit').on('click', function(event)
{
    userInput = $('#search').val();
    console.log(words);
    console.log(queryUrl);

    if (userInput.length == 0)
    {
        $('#warning').html('<h3>Please enter a word before submitting');
        $('#warning').css({'font-size': '12px', 'color': '#ff0000 '});
    }
    else
    {
        // Append the user's input to the words array
        words.push(userInput);
        $('#warning').empty();

        // GIF API URL
        var queryUrl = `https://api.giphy.com/v1/gifs/search?q=${userInput}&api_key=${apiKey}&limit=5`; 

        $.ajax({
            method: "GET",
            url: queryUrl
        }).then(function(response)
        {
            // gifUrl = response.images.fixed_height_still;
            console.log(response.data[0].images.fixed_height_still.url);
        })
    }
});

