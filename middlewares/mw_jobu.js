/* eslint-disable max-len */
module.exports = function(req, res, next) {
  const lastPath = req.originalUrl.split('/').pop();
  const userID = parseInt(req.header('Jobu-User'));
  const token = parseInt(req.header('Jobu-Token'));

  if (lastPath=='login' || lastPath=='signup') {
    next();
  } else if (userID==2 && token=='j0but35t1ngph453') {
    next();
  } else {
    res.send({'status': false, 'message': 'No Authorized', 'error': {'type': 'NO_AUTH'}});
  }
};
