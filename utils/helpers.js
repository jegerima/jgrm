const jparse = function jparse(status, message, data) {
  const packet = {};
  packet.status = status;
  packet.message = ((message==null)?'Unexpected error':message);
  packet.data = ((data==null)?{}:data);

  return packet;
};

const logerror = function logError(logger, err) {
  console.log(err);
  logger.error(err.message==null?err:err.message,
      {timestamp: Date.now(), pid: process.pid});
};

const loginfo = function logInfo(logger, data) {
  logger.info(data, {timestamp: Date.now(), pid: process.pid});
};

const sout = function sout(...args) {
  console.log(args);
};

const isNullOrEmpty = function isNullOrEmpty(str) {
  try {
    return (!str || /^\s*$/.test(str));
  } catch (err) {
    console.log('Error at isNullOrEmpty. Value: ['+str+'].');
    return true;
  }
};

module.exports = {
  jparse, logerror, loginfo, sout, isNullOrEmpty,
};

