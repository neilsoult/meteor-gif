import gifshot from 'gifshot';
let resetPage = () => {
    $('.container').removeClass('dn');
    $('.result').addClass('dn');
    $('form')[0].reset();
};

Template.body.onRendered(() => {
    resetPage();
    let $dropzone = $('#dropDiv');
    $dropzone.on('drag dragstart dragend dragover dragenter dragleave drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
    })
    .on('dragover dragenter', () => {
        $dropzone.addClass('dragging');
    })
    .on('dragleave dragend drop', () => {
        $dropzone.removeClass('dragging');
    })
    .on('drop', (e) => {
        console.log('drop event', e);
        _.each(e.originalEvent.dataTransfer.files, (file) => {
            console.log('input', file);
            Meteor.saveFile(file, file.name, null, file.type, () => {});
        });
    });
    $('form').on('submit', (e) => {
        e.preventDefault();
        let milliseconds = e.target.ms.value;
        let files = Meteor.getFiles();
        let fileNodes = Object.keys(Meteor.getFiles()).map((node) => {
            return files[node];
        });

        if (milliseconds > 0 && fileNodes.length > 1) {
            gifshot.createGIF({
                'images': fileNodes,
                'frameDuration': milliseconds
            }, (obj) => {
                $('.result img').attr('src', obj.image);
                $('.result a').attr('href', obj.image);
                $('.container').addClass('dn');
                $('.result').removeClass('dn');
            });
        }
    });
    $('button.reset').on('click', resetPage);
});

Template.gifmaker.events({
    'change input': (event) => {
        console.log('index', $('form input').index($(event.target)));
        _.each(event.target.files, (file) => {
            console.log('input', file);
            Meteor.saveFile(file, file.name, null, file.type, () => {});
        });
    }
});