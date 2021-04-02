import express from 'express';
import router from './routes/index';
import sequelize from './db';

const PORT = 8080;

const app = express();
app.use(express.json());
app.use('/api', router);


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
