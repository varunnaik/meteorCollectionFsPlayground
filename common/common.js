/**
 * Created by varun on 1/6/14.
 */
// Note: If potentially sensitive info goes here (such as keys) this should be protected.
var profilePicsDir = "~/profile-pictures/";
ProfilePics = new FS.Collection("profile-pictures", {
    stores: [
        new FS.Store.FileSystem("profile-picture", {path: profilePicsDir+"original/"}),
        new FS.Store.FileSystem("profile-picture-tiny", {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 23x25px thumbnail
                gm(readStream, fileObj.name()).resize('23', '25').stream().pipe(writeStream);
            },
            path: profilePicsDir+"tiny/"
        }),
        new FS.Store.FileSystem("profile-picture-small", {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 64x72px thumbnail
                gm(readStream, fileObj.name()).resize('64', '72').stream().pipe(writeStream);
            },
            path: profilePicsDir+"small/"
        }),
        new FS.Store.FileSystem("profile-picture-normal", {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a full-size profile picture
                gm(readStream, fileObj.name()).resize('171', '180').stream().pipe(writeStream);
            },
            path: profilePicsDir+"normal/"
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});
