/* eslint-disable */
describe('save_file', function () {

    let stub;
    beforeEach(function () {
        stub = sinon.stub(FileReader.prototype, 'readAsDataURL', function (file) {
            this.onload(file);
        });
    })

    afterEach(function () {
        stub.restore();
    });

    it('returns an error if fileType is wrong', function () {

        let message = 'Invalid file type.';
        let callback = sinon.spy();
        chai.assert.equal(Meteor.saveFile({type: 'badType'}), message);
        Meteor.saveFile({type: 'badType'}, null, callback);
        chai.assert(callback.calledWith(message));

    });

    it('returns the image file to the success handler', function () {

        let file = { name: 'sample', target: { result: 'imgsrc' }, type: 'image/png' };
        let callback = sinon.spy();
        Meteor.saveFile(file, callback);
        chai.assert(callback.called);
        let $el = $(callback.args[0][0]);
        chai.assert.equal($el.attr('src'), 'imgsrc');

    });

});