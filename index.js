const fs = require('fs');
const csv = require('csv-parser');

// Delete canada.txt and usa.txt if they already exist
try {
  fs.unlinkSync('canada.txt');
  fs.unlinkSync('usa.txt');
} catch (err) {
  // Do nothing - the files simply don't exist
}

// Open the input_countries.csv file
fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (data) => {
    // Filter data for Canada
    if (data.country === 'Canada') {
      fs.appendFileSync('canada.txt', `${data.country},${data.year},${data.population}\n`);
    }
    // Filter data for United States
    if (data.country === 'United States') {
      fs.appendFileSync('usa.txt', `${data.country},${data.year},${data.population}\n`);
    }
  });