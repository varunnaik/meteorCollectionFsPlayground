/**
 * Created by varun on 15/6/14.
 */
ResizeUploadPictures = {
    makeNew: function(name, sizes) {
        // name is the name for the set of pictures being uploaded
        // sizes is an array of objects, {name: "name", height: "", width: ""}

        var connectionParams = {};
        connectionParams.stores = [];
        connectionParams.filter = {
            allow: {
                contentTypes: ['image/*'] //allow only images in this FS.Collection
            }
        };

        sizes.forEach(function(size) {

            if (size.name && size.height && size.width) {
                connectionParams.stores.push(new FS.Store.GridFS(size.name, {
                    transformWrite: function(fileObj, readStream, writeStream) {
                        gm(readStream, fileObj.name()).resize(size.width, size.height).stream().pipe(writeStream);
                    }
                }));
            } else if (size.name) {
                connectionParams.stores.push(new FS.Store.GridFS(size.name));
            }

        });

        return new FS.Collection(name, connectionParams);
    }
};