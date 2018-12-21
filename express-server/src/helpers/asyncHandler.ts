import * as log4js from 'log4js';

export default fn => (req, res, next = log4js.getLogger('app').error) =>
  Promise
    .resolve(fn(req, res, next))
    .catch((err) => {
      next(err);
      res.status(500).send({ error: 'Error!' });
    })