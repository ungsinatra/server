const checkUlr = (req, res, next) => {
  if (req.originalUrl.includes('me/') && !req.params.id) {
    res.status(400).send('Не указан ID');
  } else {
    next();
  }
};
export default checkUlr;
