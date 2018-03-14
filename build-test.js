const os = require('os');
const logger = console;
logger.log('process.env.TMPDIR is', process.env.TMPDIR);
logger.log('os.tmpdir() is:', os.tmpdir());
