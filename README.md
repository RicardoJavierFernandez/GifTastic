# GifTastic
![Project Screenshot](https://github.com/RicardoJavierFernandez/GifTastic/blob/master/assets/images/PageScreenshot.PNG)
This application utilizes the Giphy API to retrieve gif images. Images are retrieved when the user clicks one of the buttons at the top of the page, or when the user types a name in the input box and hits the submit button.

The application includes the following features:
1. Any word submitted by the user will get converted to title case, and if the word is not part of the buttons at the top of the page, it is then added along the other buttons.
2. The user will receive a warning when they hit the submit button and no text is provided by the user in the input box.
3. Hovering over the images returned by the API request will create a border around the image and make the image opaque. This allows the user to see that images are "clickable".
4. If an image is clicked, the image changes state. If it was a still image prior to being clicked, it converts to the gif version of the image, and vice-a-versa.
    
