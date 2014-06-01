/**
 * Created by varun on 1/6/14.
 */
ProfilePics = new FS.Collection("profile-pictures", {
    stores: [new FS.Store.FileSystem("profile-pictures", {path: "~/profile-pictures/"})]
});
