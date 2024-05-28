import fs from 'fs';
import express from "express";

const port = process.env.PORT || 3000;



let riddle = [];

try {
  const data = fs.readFileSync('./hindi_riddles.json', 'utf8');
    riddle = JSON.parse(data);
} catch (err) {
  console.error(err);
}

riddle=[...new Set(riddle)];

function extractAnswer(text) {
  // Define all possible dash characters
  const dashCharacters = ['-', '–', '—'];
  
  // Find the first occurrence of any dash character
  let delimiterIndex = -1;
  for (let dash of dashCharacters) {
      delimiterIndex = text.indexOf(dash);
      if (delimiterIndex !== -1) break;
  }

  if (delimiterIndex !== -1) {
      // Increment index to skip all consecutive dashes and leading spaces
      let startIndex = delimiterIndex + 1;
      while (startIndex < text.length && (dashCharacters.includes(text[startIndex]) || text[startIndex] === ' ')) {
          startIndex++;
      }

      // Return the substring from the first non-dash, non-space character to the end of the string
      return text.substring(startIndex).trim();
  }
  return text; // If no dash character is found, return the original text
}


const app = express();
app.use(express.static("public"));

app.listen(port, () => {
    console.log("listening");
})

app.get("/", (req, res) => {
  let obj = riddle[Math.floor(Math.random() * riddle.length)];
  obj.answer = extractAnswer(obj.answer);
  console.log(obj,riddle.length);
  res.render("index.ejs",{riddle:obj});
})













