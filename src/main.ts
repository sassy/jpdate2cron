import 'moment/locale/ja';
import moment from 'moment';
import { createCommand} from 'commander';

const version = require("../package.json");

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
        return `${moment().format('YYYY-MM-DD')} ${time}`;
    } else {
        return "";
    }
}

export function convertCron(date?: string, time?: string) : string {
    const dayString = buildDayString(date, time);
    const utcString = moment(dayString).utc();
    if (date && time) {
        return utcString.format('m H D M *');
    } else if (date) {
        return utcString.format('* * D M *');
    } else if (time) {
        return utcString.format('m H * * *');
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

