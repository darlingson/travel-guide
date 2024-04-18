const fs = require('fs');

// Read the existing JSON file
const rawData = fs.readFileSync('./assets/places.json');
const jsonData = JSON.parse(rawData);

const generateID = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const modifyJSON = (data) => {
  return data.map((item) => ({
    id: generateID(),
    name: item.name,
    description: item.description,
    district: item.district,
    location: item.location,
    link: item.link,
    imagePaths: [
      'images/image1.jpg',
      'images/image2.jpg',
    ]
  }));
};

const modifiedData = modifyJSON(jsonData);

fs.writeFileSync('modified_data.json', JSON.stringify(modifiedData, null, 2));

console.log('JSON file modified successfully!');
