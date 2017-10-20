let fileNodes = {};

Meteor.getFiles = () => {
    return fileNodes;
};

Meteor.saveFile = function(blob, name, path, type, callback) {
    var fileReader = new FileReader(),
        method, encoding = 'binary';
    type = type || 'binary';
    switch (type) {
        case 'image/png':
        case 'image/jpeg':
        case 'binary':
            method = 'readAsDataURL';
            encoding = 'binary';
            break;
        default:
            method = 'readAsDataURL';
            encoding = 'binary';
            break;
    }
    fileReader.onload = function(file) {
       console.log(file);
       let img = document.createElement('img');
       img.src = file.target.result;
       fileNodes[name] = img;
       callback(file);
    }
    fileReader[method](blob);
}