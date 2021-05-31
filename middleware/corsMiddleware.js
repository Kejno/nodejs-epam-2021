import cors from 'cors';

// const allowedOrigins = ['http://localhost:3001', 'http://example.com'];

export const corsMiddleware = (allowedOrigins) => {
    const corsOptions = {
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
        'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    };


    return cors(corsOptions);
};
