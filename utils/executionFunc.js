import { green } from 'colors';

export const executionTime = async (fn) => {
    try {
        const start = new Date();
        const data = await fn;
        const execTime = new Date() - start;
        const template = `${green('Execution time:')} ${execTime} ms`;
        return { execTime: template, ...data };
    } catch (error) {
        console.log(error);
    }
};

