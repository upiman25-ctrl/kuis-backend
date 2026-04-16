const { Gacha, Prize } = require('../models');

exports.runGacha = async (userId) => {
  const existing = await Prize.countDocuments();

  if (existing === 0) {
    await Prize.create([
      { name: 'Emas 10 gram', quota: 1, remaining: 1 },
      { name: 'Smartphone X', quota: 5, remaining: 5 },
      { name: 'Smartwatch Y', quota: 10, remaining: 10 },
      { name: 'Voucher Rp100.000', quota: 100, remaining: 100 },
      { name: 'Pulsa Rp50.000', quota: 500, remaining: 500 },
    ]);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const count = await Gacha.countDocuments({
    userId,
    createdAt: { $gte: today },
  });

  if (count >= 5) {
    throw new Error('Limit gacha hari ini habis');
  }

  const prizes = await Prize.find({ remaining: { $gt: 0 } });

  const randomIndex = Math.floor(Math.random() * (prizes.length + 1));

  let selectedPrize = null;

  if (randomIndex < prizes.length) {
    selectedPrize = prizes[randomIndex];
  }

  if (selectedPrize) {
    selectedPrize.remaining -= 1;
    await selectedPrize.save();
  }

  await Gacha.create({
    userId,
    prize: selectedPrize ? selectedPrize.name : null,
  });

  return selectedPrize ? selectedPrize.name : null;
};

exports.getHistory = async (userId) => {
  const history = await Gacha.find({ userId }).sort({ createdAt: -1 });
  return history;
};

exports.getPrizes = async () => {
  const prizes = await Prize.find();
  return prizes;
};

function maskName(name) {
  if (!name || typeof name !== 'string') return '***';

  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 2) return '*'.repeat(word.length);

      const first = word[0];
      const last = word[word.length - 1];
      const middle = '*'.repeat(word.length - 2);

      return first + middle + last;
    })
    .join(' ');
}

exports.getWinners = async () => {
  const gachas = await Gacha.find({ prize: { $ne: null } });

  const result = {};

  for (const gacha of gachas) {
    if (!gacha.userId) continue;

    if (!result[gacha.prize]) {
      result[gacha.prize] = [];
    }

    result[gacha.prize].push(maskName(gacha.userId));
  }

  return Object.keys(result).map((prize) => ({
    prize,
    winners: result[prize],
  }));
};
