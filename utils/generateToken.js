import jwt from 'jsonwebtoken';

export const generateToken = (id, login) => {
    return jwt.sign({ id, login }, process.env.JWT_SECRET, {
        expiresIn: '10h'
    });
};

