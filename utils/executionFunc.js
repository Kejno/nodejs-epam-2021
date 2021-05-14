export const executionTime = async (fn) => {
    try {
        const start = new Date();
        const data = await fn;
        const execTime = new Date() - start;
        return { execTime, ...data };
    } catch (error) {
        console.log(error);
    }
};
