const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MONGO_URI =
  'mongodb+srv://kevhjc:bookmarkr@cluster0.sdtfc.mongodb.net/bookmarkr?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const bookmarksSchema = new Schema({
  url: { type: String, required: true },
  categories: { type: String },
});

module.exports = mongoose.model('Bookmark', bookmarksSchema);
