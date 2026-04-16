const {
  runGacha,
  getHistory,
  getPrizes,
  getWinners,
} = require('../../../services/gacha-service');

module.exports = (app) => {
  app.post('/gacha', async (req, res) => {
    try {
      const { userId } = req.body;

      const result = await runGacha(userId);

      res.json({
        message: result ? 'Menang!' : 'Zonk',
        prize: result,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/gacha/history/:userId', async (req, res) => {
    try {
      const { userId } = req.params;

      const history = await getHistory(userId);

      res.json(history);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/gacha/prizes', async (req, res) => {
    try {
      const prizes = await getPrizes();

      res.json(prizes);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/gacha/winners', async (req, res) => {
    try {
      const winners = await getWinners();

      res.json(winners);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
};
