const mongoose = require("mongoose");
const showtimeSchema = new mongoose.Schema(
  {
    date: {
      type: Date
    },
    theaters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theaters"
      }
    ]
  },
  {
    _id: false
  }
);

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmailList"
    },
    created: {
      type: Date,
      default: Date.now()
    },
    rating: {
      type: Number
    }
  },
  {
    _id: false
  }
);

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  releaseDate: {
    type: Date
  },
  ratings: {
    totalRating: {
      type: Number
    },
    totalCount: {
      type: Number
    },
    allRatings: [ratingSchema]
  },
  showTime: [showtimeSchema],
  metadata: {
    image:String,
    description:String,
    //lots of properties related to movie
  }
});

const Movies = mongoose.model("Movies", MovieSchema);
module.exports = Movies;
