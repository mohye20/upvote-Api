import { scheduleJob, RecurrenceRule } from "node-schedule"

export const cronOne = () => {
    const job = scheduleJob('*/5 39 * * * *', function () {
        console.log('one');
    });
    return job
}

export const cronTwo = () => {
    const job = scheduleJob({ hour: 14, minute: 44, dayOfWeek: 2 }, function () {
        console.log('two');
    });
    return job
}


const rule = new RecurrenceRule();
rule.dayOfWeek = 2;
rule.hour = 14;
rule.minute = 46;
rule.tz="Africa/Cairo"

export const cronThree = () => {
    const job = scheduleJob(rule, function () {
        console.log('three');
    });
    return job
}

