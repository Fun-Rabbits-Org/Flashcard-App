const Deck = require('./model');
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
      console.log('Delete Function Data', data);
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

//New Added Feature: Edit Deck name
router.put('/deck/:deckId', async (req, res) => {
  const deckId = req.params.deckId;
  const { nameUpdate } = req.body;
  await Deck.findByIdAndUpdate(
    { _id: deckId },
    { $set: { deckName: nameUpdate } }
  )
    .then((data) => {
      console.log(`Will update with: ${data}`);
      res.locals.updateDeckName = data;
      return res.status(200).json(res.locals.updateDeckName);
    })
    .catch((error) => {
      return next({
        log: 'Express error handler caught in DeckController.put',
        status: 400,
        message: { error: `${error}` },
      });
    });
});

module.exports = router;
