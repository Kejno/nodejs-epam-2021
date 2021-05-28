import { cyan } from 'colors';
import { ConsoleLogger } from '../utils/logger';

export const loggerMiddleware = async (req, res, next) => {
    const body = `${cyan('Body')}: ${JSON.stringify(req.body)}`;
    const query = `${cyan('Query')}: ${JSON.stringify(req.query)}`;
    const method = `${cyan('Request')}: ${req.method} ${req.url}`;

    ConsoleLogger.info(`${method}, ${body}, ${query}`);

    next();
};
