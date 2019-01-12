const Bull = require('bull');
const Config = require('../config')
const bullSystem = {};
let removeOnComplete = true;


bullSystem.initBull = function() {
  console.log('Bull redis', Config.redisHost , Config.redisPort);
  const queue = new Bull('email_queue', {redis:{host:Config.redisHost,port:Config.redisPort}});

  bullSystem.bullJobs = queue;

  bullSystem.addJob = (name, data, { attempts = 3,delay = 0, timeout = 120000, backOffDelay = 10000, jobId } = {}) => {
    const jobOptions = {
      attempts,
      backoff: { type: 'fixed', delay: backOffDelay },
      delay,
      timeout,
      removeOnComplete,
      jobId,
    };
    return queue.add(name, data, jobOptions);
  };

  bullSystem.addCronJob = (name, data, { attempts = 3,delay = 0, timeout = 120000, backOffDelay = 10000, jobId } = {}) => {
    let jobOptions;
    let repeat={}
    if(data.frequency =="daily"){
      repeat.cron = "0 0 * * *"
    }else if("weekly"){
      repeat.cron = "0 0 * * 0"
    }else{
      repeat.cron="0 0 1 * *"
    }
    jobOptions = {
      repeat:repeat,
      attempts,
      backoff: { type: 'fixed', delay: backOffDelay },
      delay,
      timeout,
      removeOnComplete:false,
      jobId,
    };
    return queue.add(name, data, jobOptions);
  };

  queue.on('error', error => {
    console.log('Bull error', error);
  });

  queue.on('active', job => {
    // log worker start
    console.log("Worker active", job);
  });

  queue.on('completed', (job, result) => {
    // log worker completed
    //  console.log("Worker completed", job);
  });

  queue.on('failed', (job, err) => {
    // log worker failed
    // console.log("Bull worker failed", job, err);
  });

  bullSystem.startBullWorkers = function(system) {
    if (bullSystem.bullJobs) {
      console.log('Starting Bull Workers');
      require('./workers')(system);
    }
  };

  bullSystem.startBullWorkers(bullSystem);
};

bullSystem.initBull();
module.exports={bullSystem};