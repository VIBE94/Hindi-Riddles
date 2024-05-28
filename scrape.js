const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.mindyourlogic.com/paheliyan/100-paheliyan-to-test-your-logic';

axios.get(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const riddles = [];

    $('article.riddle-box').each((index, element) => {
        const hindiRiddle = $(element).find('div.col-md-10 p').first().text().trim();
        const englishRiddle = $(element).find('div.col-md-10 p').last().text().trim();
        const answer = $(element).find('div.collapse-div b').text().replace('उत्तर – ', '').trim();

        if (hindiRiddle && englishRiddle && answer) {
            riddles.push({ hindiRiddle, englishRiddle, answer });
        }
    });

    

    fs.appendFileSync('hindi_riddles.json', JSON.stringify(riddles, null, 2), 'utf-8');
    console.log('Riddles saved to hindi_riddles.json');
}).catch(error => {
    console.error('Error fetching the webpage:', error);
});
