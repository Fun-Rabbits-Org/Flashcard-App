const Deck = require('../models/model');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  console.log('sucessful get');

  const getDecks = await Deck.find();
  return res.status(200).json(getDecks);
});

router.post('/', (req, res, next) => {
  const { deckName, cards } = req.body;
  console.log('deck:', deckName);
  console.log('cards', cards);
  console.log('is this working?');
  Deck.create(req.body) //
    .then((data) => {
      res.locals.newDeck = data;
      console.log('it worked');
      return res.status(200).json(res.locals.newDeck);
    })
    .catch((error) => {
      return next({
        log: 'Express error handler caught in DeckController.post',
        status: 400,
        message: { error: `${error}` },
      });
    });
});

router.delete('/deck/:deckId', async (req, res, next) => {
  const deckId = req.params.deckId;
  await Deck.findByIdAndDelete(deckId)
    .then((data) => {
      if (data.deletedCount === 0) {
        return next({
          log: 'Express error handler caught in DeckController.delete',
          status: 400,
          message: { error: 'Deck not found' },
        });
      }

      res.locals.message = 'Deleted deck';
      return res.status(200).json(res.locals.message);
    })
    .catch((error) => {
      return next({
        log: 'Express error handler caught in DeckController.delete',
        status: 400,
        message: { error: `${error}` },
      });
    });
});

router.get('/deck/:deckId', async (req, res, next) => {
  const deckId = req.params.deckId;
  await Deck.findById(deckId)
    .then((data) => {
      if (!data) {
        return next({
          log: 'Express error handler caught in DeckController.getDeck',
          status: 400,
          message: { error: `${error}` },
        });
      }

      res.redirect(200, '/deck/:deckId/card');
    })
    .catch((error) => {
      return next({
        log: 'Express error handler caught in DeckController.getDeck',
        status: 400,
        message: { error: `${error}` },
      });
    });
});

module.exports = router;
