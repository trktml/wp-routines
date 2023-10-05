import { CronJob } from 'cron';
let cronSender: CronJob;

export function init(
    cronTime: string = '* * * * * *',
    messageSender: { from: string },
    // client: Client
): CronJob {
    cronSender = new CronJob(
        cronTime,
        function () {},
        null,
        false,
        'Europe/Brussels'
    );
    return cronSender;
}

export function start(): CronJob {
    if (cronSender) {
        cronSender.start();
    } else {
        console.log('cronSenderObject is not initialized!');
    }
    return cronSender;
}

export function stop(): CronJob {
    if (cronSender) {
        cronSender.stop();
    } else {
        console.log('cronSenderObject is not initialized!');
    }
    return cronSender;
}

export default {
    init,
    start,
    stop,
};

console.log("working...");
