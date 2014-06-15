/**
 * Created by varun on 1/6/14.
 */
// Note: If potentially sensitive info goes here (such as keys) this should be protected.
// Images are stored in ../.meteor/local/cfs/files

ProfilePics = new FS.Collection("profile-pictures", {
    stores: [
        new FS.Store.GridFS("profile-picture-original"),
        new FS.Store.GridFS("profile-picture-tiny", {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 23x25px thumbnail
                gm(readStream, fileObj.name()).resize('23', '25').stream().pipe(writeStream);
            }
        }),

        new FS.Store.GridFS("profile-picture-small", {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 64x72px thumbnail
                gm(readStream, fileObj.name()).resize('64', '72').stream().pipe(writeStream);
            }
        }),

        new FS.Store.GridFS("profile-picture-normal", {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a full-size profile picture
                gm(readStream, fileObj.name()).resize('171', '180').stream().pipe(writeStream);
            }
        })
        // Note: A saved image will have the same name in all the directories above.
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});
