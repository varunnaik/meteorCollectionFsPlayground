/**
 * Created by varun on 15/6/14.
 */
Package.describe({
    summary: "Upload pictures and resize them before storing into GridFS on the server."
});
Package.on_use(function (api, where) {
    api.use(['collectionFS', 'cfs-gridfs']);
    api.add_files(['resize-pictures-upload.js']);
    if (api.export)
        api.export('ResizeUploadPictures');
});
