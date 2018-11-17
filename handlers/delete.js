const fs = require('fs');
const path = './top250.json';

module.exports.delete = (id) => {
    let json = JSON.parse(fs.readFileSync(path));
    if (id > json.length || id < 0){
        return false;
    }
    return deleteElement(json,id);
};

function deleteElement(json, id){
    let position = getIndex(json,id);
    console.log(position);
    if (position === -1){
        return false;
    }
    json.splice(position,1);
    json = shakeArray(json,position);
    try{
        fs.writeFileSync(path, JSON.stringify(json));
        return true;
    }
    catch (error){
        return false;
    }
}

function shakeArray(json, position){
    if (position < json.length)
    {
        for (let index = position; index < json.length; index++){
            json[index].id = index+1;
        }
    }
    return json;
}

function getIndex(array, id){
    let index;
    array.forEach((element,position) => {
        if (element.id === id){
            index = position
        }
    })
    return index ? index : -1;
}