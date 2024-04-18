const fs = require('fs');

// Read the existing JSON file
const rawData = fs.readFileSync('./assets/places.json', 'utf8');
const jsonData = JSON.parse(rawData);

// Function to generate unique numeric IDs
const generateID = () => {
  return Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
};

// Function to add ID, additional fields, and image paths to each item
const modifyJSON = (data) => {
  return data.map((item) => ({
    id: generateID(),
    name: item.name,
    description: item.description,
    district: item.district,
    location: item.location,
    link: item.link,
    // Add other fields here
    tags: item.tags || [], // Assuming tags is an array of strings
    coordinates: item.coordinates || { latitude: 0, longitude: 0 }, // Assuming coordinates is an object with latitude and longitude
    type: item.type || 'default', // Assuming type is a string
    // Add your relative image paths property here
    imagePaths: [
      'images/image1.jpg', // Replace with the relative paths to your images
      'images/image2.jpg',
      // Add more relative image paths as needed
    ]
  }));
};

// Modify the JSON data
const modifiedData = modifyJSON(jsonData);

// Write the modified data back to a new JSON file
fs.writeFileSync('modified_data.json', JSON.stringify(modifiedData, null, 2));

console.log('JSON file modified successfully!');
