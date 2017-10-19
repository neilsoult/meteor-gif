Template.gifmaker.events({
    'change input': function(ev) {
        _.each(ev.target.files, function(file) {
            Meteor.saveFile(file, file.name);
        });
    }
});