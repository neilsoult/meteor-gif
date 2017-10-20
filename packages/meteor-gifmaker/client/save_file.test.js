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

    it('must run tests', function () {
        console.log('test', Meteor);
        return true;
    });

    it('returns an error if fileType is wrong', function () {

        let message = 'Invalid file type.';
        let callback = sinon.spy();
        chai.assert.equal(Meteor.saveFile({type: 'badType'}), message);
        Meteor.saveFile({type: 'badType'}, callback);
        chai.assert(callback.calledWith(message));

    });

    it('saves the image file', function () {

        let file = { name: 'sample', target: { result: 'imgsrc' }, type: 'image/png' };
        Meteor.saveFile(file);
        let files = Meteor.getFiles();
        console.log(files.sample);
        chai.assert.equal($(files.sample).attr('src'), 'imgsrc');

    });

});