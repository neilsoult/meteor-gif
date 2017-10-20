Package.describe({
    name: 'meteor-gifmaker',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse((api) => {
    api.versionsFrom('1.1');
    api.addFiles('client/save_file.js', 'client');
});

Package.onTest((api) => {
    api.use('meteor-gifmaker');
    api.use([
        'ecmascript',
        'practicalmeteor:chai',
        'practicalmeteor:mocha',
        'practicalmeteor:sinon'
    ]);
    api.mainModule('client/save_file.test.js', 'client');
});
