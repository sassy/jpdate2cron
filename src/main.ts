import 'moment/locale/ja';
import moment from 'moment';


function convertCron(date: string, time: string) : string {
    const day = moment(date + " " + time).utc();
    return day.format('m H D M *');
}

if (process.argv.length > 3) {
    const ret = convertCron(process.argv[2], process.argv[3]);
    console.log(ret);
}
