import { createLogger, transports, format } from 'winston';
import colors from 'colors';
import dateFormat from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const { combine, timestamp, printf, colorize, json } = format;

// eslint-disable-next-line no-shadow
const myFormat = printf(({  level, message, timestamp }) => {
    const formattedTime = dateFormat(parseISO(timestamp), 'MM-dd-yy HH:mm:ss');

    return [colors.yellow(formattedTime), level, ':', message].filter(Boolean).join(' ');
});

export const ConsoleLogger = createLogger({
    level: 'info',
    colorize: true,
    format: combine(colorize(), json(), timestamp(), myFormat),
    transports: [new transports.Console()],
    prettyPrint: true
});

