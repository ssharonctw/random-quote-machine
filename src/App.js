import React, {useEffect, useState} from 'react';
import './App.css';
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  //const[state, setState] = useState(initialState)
  const[quote, setQuote] = useState("a quote")
  const[author, setAuthor] = useState("an author")
  const[randomNumber, setRandomNumber] = useState(0)
  const[quotesArray, setQuotesArray] = useState(null)
  const[accentColor, setAccentColor] = useState('#282c34')
  

  const fetchQuotes = async(url)=>{
    const response = await fetch(url)
    //need to parse the reponse into json format
    //await keyword is used so that its not promised value until its fetched
    const parsedJSON = await response.json()    
    //here must add.quotes because originally the fetched content was an object named 'quotes' with 102 key-value pairs in it
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(()=>{
    fetchQuotes(quoteDBUrl)
  },[quoteDBUrl]
  )

  //the function below sets the randomNumber through its state funciton setRandomNumber
  //the Math.floor would round the numbers to integers without its decimal places
  //we can wrap multi-line statement since the function should change both quote & author
  const generateRandomNumber =() =>{
    let randomInteger = Math.floor(quotesArray.length*Math.random());
    setRandomNumber(randomInteger);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    setAccentColor(COLORS_ARRAY[randomInteger]);
  }

/* 
//The original quote array before fetching it from quoteDBUrl
//can change the quoteArray in "generateRandomNumber" function to access this static array instead
  const quotesArrayOrig =[
    {quote: "quote1", author: "author1"}, 
    {quote: "quote2", author: "author2"}, 
    {quote: "quote3", author: "author3"}
  ]
*/
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor : accentColor, color : accentColor}}>
        <div id="quote-box">
        {/* <h1>Random Number: {randomNumber}</h1> */}
          <div id = "text" style={{color : accentColor}}>
          <p>"{quote}"</p>
          
          <p id ="author">- {author}</p>
          </div>
          
          <div className = "buttons">
          {/* the href below uses ?text=hello to replace the default text to be tweeted */}
          {/* the encodeURI makes sure that the url does not include unsafe character such as % from the vairable {quote}*/}
          <a style={{backgroundColor : accentColor}} id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
           <FontAwesomeIcon icon={faTwitter} />
          </a>
        {/*below needs to be declared as an anonymous function, which will stop execution right away*/}
        <button style={{backgroundColor : accentColor}} id="new-quote" onClick = {()=>{
          generateRandomNumber(Math.random());
          }}>Generate A Random Quote</button>
          </div>
        
        
        </div>
      </header>
    </div>
  );
}

export default App;
