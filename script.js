//Async - Run at anytime independently and it won't stop the browser from completing loading of the page
const quoteContainer = document.getElementById("quote-textbox");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        //constant will not populate until it has data fetched from API
        const response = await fetch(apiUrl);
        //Turn response into JSON Object
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        getQuotes();
        alert(error);
        // Catch Error here and handle it
    }
}

//Show New Quote
function newQuote() {
    showLoadingSpinner();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    quoteText.textContent = quote.text;

    //Check length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    removeLoadingSpinner();
}

function tweetQuotes() {
    //backticks 
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Add Event Listners for Button Functionality
newQuoteButton.addEventListener('click', function(){newQuote()});
twitterButton.addEventListener('click', function(){tweetQuotes()});

getQuotes();