const fs = require('fs');
function createTable(jsonData, tableName) {
    const obj = jsonData[0];
    let sql = `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;
    sql += `id INT PRIMARY KEY,\n`;
    sql += `name VARCHAR(255),\n`;
    sql += `description TEXT,\n`;
    sql += `district VARCHAR(255),\n`;
    sql += `location VARCHAR(255),\n`;
    sql += `link VARCHAR(255),\n`;
    sql += `latitude FLOAT,\n`;
    sql += `longitude FLOAT,\n`;
    sql += `image_paths TEXT\n`;
    sql += `);\n`;

    return sql;
}
function jsonToSQL(jsonData, tableName) {
    let sql = `INSERT INTO ${tableName} (id, name, description, district, location, link, latitude, longitude, image_paths) VALUES\n`;

    for (let i = 0; i < jsonData.length; i++) {
        const obj = jsonData[i];
        const imagePaths = obj.imagePaths && obj.imagePaths.length > 0 ? obj.imagePaths.join(';') : '';
        sql += `(${obj.id}, '${obj.name.replace(/'/g, "''")}', '${obj.description.replace(/'/g, "''")}', '${obj.district}', '${obj.location}', '${obj.link}', ${obj.coordinates.latitude}, ${obj.coordinates.longitude}, '${imagePaths}'),\n`;
    }

    sql = sql.slice(0, -2) + ';';

    return sql;
}

const inputFile = 'assets/data.json'; 
const outputFile = 'output.sql';
const tableName = 'places';

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        let sql = createTable(jsonData, tableName);
        sql += '\n\n';
        sql += jsonToSQL(jsonData, tableName);

        fs.writeFile(outputFile, sql, err => {
            if (err) {
                console.error('Error writing SQL file:', err);
                return;
            }
            console.log('SQL file generated successfully!');
        });
    } catch (err) {
        console.error('Error parsing JSON data:', err);
    }
});