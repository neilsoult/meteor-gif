import gifshot from 'gifshot';

let resetPage = () => {
    $('.container').removeClass('dn');
    $('.result').addClass('dn');
    $('form')[0].reset();
    $('.preview').empty();
};

Template.body.onRendered(() => {
    resetPage();
    let $dropzone = $('#dropzone');
    // handle these events in jQuery because blaze is laborious
    $dropzone.on('drag dragstart dragend dragover dragenter dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
    })
    .on('dragover dragenter', () => {
        $dropzone.addClass('dragging');
    })
    .on('dragleave dragend drop', () => {
        $dropzone.removeClass('dragging');
    });
    // gif creator
    $('form').on('submit', (e) => {
        e.preventDefault();
        let milliseconds = e.target.ms.value;
        let fileNodes = $('.preview img').toArray();

        // make sure we have the bare minimum
        if (milliseconds > 0 && fileNodes.length > 1) {
            gifshot.createGIF({
                images: fileNodes,
                frameDuration: milliseconds
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

let handlerFactory = (instance) => {
    return (img) => {
        instance.files.push(img);
        $('.preview').append(img);
        instance.updateTemplateView();
    };
};
let errorHandler = (err) => {
    alert(err);
};
Template.gifmaker.events({
    'change input': (event, templateInstance) => {
        let file = event.target.files[0];
        Meteor.saveFile(file, handlerFactory(templateInstance), errorHandler);
    },
    'drop #dropzone': (event, templateInstance) => {
        event.preventDefault();
        _.each(event.originalEvent.dataTransfer.files, (file) => {
            Meteor.saveFile(file, handlerFactory(templateInstance), errorHandler);
        });
    }
});

Template.gifmaker.helpers({
    // this could be increased if more image imputs were desired
    arr: [1, 2, 3, 4, 5],
    inputAttributes: (idx) => {
        return {
            'data-index': idx,
            class: 'dn',
            id: `upload${idx}`,
            name: `upload${idx}`,
            type: 'file'
        };
    },
    labelAttributes: (idx) => {
        return {
            id: `label${idx}`,
            for: `upload${idx}`
        };
    }
});

Template.gifmaker.onCreated(function () {
    this.files = [];
    this.updateTemplateView = () => {
        // my hacky attempt to simulate 2-way data binding in blaze
        let activeIdx = this.files.length + 1;
        $('#dropzone label').hide();
        $(`#label${activeIdx}`).show();
        $('.readyToCreate')[(activeIdx > 2 ? 'show' : 'hide')]();
    }
});

Template.gifmaker.onRendered(function () {
    this.updateTemplateView();
});
