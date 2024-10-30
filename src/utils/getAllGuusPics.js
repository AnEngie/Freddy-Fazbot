const getAllPics = () => {
    const fs = require('fs');
    const dir = 'src/\\/pictures';

    image_array = fs.readdirSync(dir) 

    return image_array
}

exports.getAllPics = getAllPics;