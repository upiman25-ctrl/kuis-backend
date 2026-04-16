module.exports = (mongoose) => {
  const gachaSchema = new mongoose.Schema({
    userId: String,
    prize: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('Gacha', gachaSchema);
};
