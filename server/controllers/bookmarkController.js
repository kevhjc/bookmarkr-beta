const Bookmark = require('../models/bookmarkModel');

const bookmarkController = {};

// bookmarkController.getAllBookmarks = (req, res, next) => {
//   Bookmark.find({}, (err, result) => {
//     if (err) {
//       res.send(
//         'Error in bookmarkController.getAllBookmarks: ' + JSON.stringify(err)
//       );
//     }
//     res.locals.bookmarks = result;
//     return next();
//   });
// };

bookmarkController.addBookmark = async (req, res, next) => {
  const { url, hashtags } = req.body;
  const hashtagsArr = hashtags.split(' ');
  const bookmark = new Bookmark({ url: url, hashtags: hashtagsArr });
  try {
    const result = await bookmark.save();
    res.locals.bookmarks = result;
    return next();
  } catch (err) {
    console.log(err);
  }
};

// bookmarkController.deleteBookmark = async (req, res, next) => {
//   const id = req.params.id;
//   await Bookmark.findByIdAndRemove(id, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     return next();
//   });
// };

module.exports = bookmarkController;
