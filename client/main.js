/**
 * Created by varun on 1/6/14.
 */
Template.profileForm.events({
    'submit #profile-form': function(event, template) {
        var files = document.querySelector('#profile-file').files;
        for (var i = 0, ln = files.length; i < ln; i++) {
            ProfilePics.insert(files[i], function (err, fileObj) {
                //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });
        }
        event.preventDefault();
    }
});

Template.profilePicsDisplay.profileImages = function() {
    return ProfilePics.find();
};