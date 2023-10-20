const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader= document.getElementById('loader')

let apiQuotes= [] //global variable
//Show loading

function loading(){
    loader.hidden= false
    quoteContainer.hidden= true
}

//Hide loading

function complete(){
    quoteContainer.hidden= false
    loader.hidden=true
}

// Show new quote
function newQuote() {
    loading()
    //Pick a random quote from apiQuotes array
    const quote= apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //check if author field blank
    if (!quote.author) {
        authorText.textContent= 'Unknown'
    } else {
        authorText.textContent = quote.author
    }
    //check if quote length, in order to change font size
    if (quoteText.length > 50){
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote') 
    }
    //Set quote, hide loader
    quoteText.textContent = quote.text
    complete()
    
}
//Get Quotes from api
//asyncronous fetch request 
async function getQuotes(){
    loading()
    const apiUrl="https://jacintodesign.github.io/quotes-api/data/quotes.json"
    try{
        const response= await fetch(apiUrl)
        apiQuotes= await response.json();
        newQuote()
    }
    catch (error){

    }
}

//Tweet a quote
function tweetQuote() {
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')    
}


//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//On Load
getQuotes(); 
