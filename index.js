import express from 'express';
import { config } from 'dotenv';
import router from './routes/index';
import sequelize from './db';
import { ConsoleLogger } from './utils/logger';
import { corsMiddleware } from './middleware/corsMiddleware';

const PORT = 8080;

config();

const app = express();
app.use(express.json());
app.use('/api', corsMiddleware(['*']), router);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

app.use((err, req, res) => {
    ConsoleLogger.error(err.stack);
    res.status(500).send('Internal Server Error');
});
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};


start();

process.on('uncaughtException', err => {
    ConsoleLogger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    ConsoleLogger.error('Unhandled rejection at ', promise, `reason: ${reason}`);
    process.exit(1);
});
