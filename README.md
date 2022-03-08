# jpdate2cron

![jpdate2cron](./doc/jpdate2cron.png)

CLI tool.
convert cron format from Date/Time in Japan.

## usage

```shell
$ jpdate2cron -d 2020/08/01 -t 11:11
```

## options

*  -V, --version      output the version number
*  -d, --date <date>  specify date
*  -t, --time <time>  specify time
*  -h, --help         display help for command

# develop

```shell
$ yarn install
$ yarn ts-node src/main -d 2020/08/01 -t 11:11
```

