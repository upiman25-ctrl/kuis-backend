module.exports = (mongoose) => {
  const prizeSchema = new mongoose.Schema({
    name: String,
    quota: Number,
    remaining: Number,
  });

  return mongoose.model('Prize', prizeSchema);
};
