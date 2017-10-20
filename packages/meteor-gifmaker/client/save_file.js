let fileNodes = {};

Meteor.getFiles = () => {
    return fileNodes;
};

Meteor.saveFile = function(file, errorHandler) {
    let fileReader = new FileReader();
    let imgRegEx = new RegExp(/(image\/)+(png|jpeg|gif)/g);
    errorHandler = typeof errorHandler === 'function' ? errorHandler : (e) => { return e; };
    if (!imgRegEx.test(file.type)) {
        return errorHandler('Invalid file type.');
    }
    fileReader.onload = function(file) {
       let img = document.createElement('img');
       img.src = file.target.result;
       fileNodes[file.name] = img;
    }
    fileReader.readAsDataURL(file);
}