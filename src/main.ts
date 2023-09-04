import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/ja'

import { createCommand} from 'commander';

const version = require("../package.json");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
dayjs.locale('ja');

export function convertISODate(date?: string) {
    if (date === undefined) {
        return undefined;
    }
    const m1 = date.match(/^(\d\d\d\d)\/(\d+)\/(\d+)/);
    if (m1) {
        return date.replace(/\//g, '-');
    }
    const m2 = date.match(/^(\d\d\d\d)\-(\d+)\-(\d+)/);
    if (m2) {
        return date;
    }
    return undefined;
}

function buildDayString(date?: string, time?: string): string {
    if (date && time) {
        return `${date} ${time}`
    } else if (date) {
        return date;
    } else if (time) {
        return `${dayjs().tz("Asia/Tokyo", true).format('YYYY-MM-DD')} ${time}`;
    } else {
        return "";
    }
}

export function convertCron(date?: string, time?: string) : string {
    const dayString = buildDayString(date, time);
    const dayjsObj = dayjs(dayString).tz("Asia/Tokyo", true);
    if (date && time) {
        return dayjsObj.tz("utc").format('m H D M *');
    } else if (date) {
        // add 1 day for transform error.
        // Day is treated as 0:00 of the specified date, so day is 9 hours earlier than the previous day.
        return dayjsObj.add(1, 'd').tz("utc").format('* * D M *');
    } else if (time) {
        return dayjsObj.tz("utc").format('m H * * *');
    } else {
        return '* * * * *';
    } 
     
}

const program = createCommand();
program.version(version);
program
    .option('-d, --date <date>', 'specify date')
    .option('-t, --time <time>', 'specify time');

program.parse(process.argv);
const options = program.opts();
const ret = convertCron(convertISODate(options.date), options.time);
console.log(ret);

