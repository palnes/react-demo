const EVENTUALLY = (func, ticks=100) => new Promise(resolve => {
    let ticksDone = 0;
    let callback = () => {
        ticksDone += 1;
        try {
            let res = func();
            if (res instanceof Promise) {
                res.then(resolve);
            } else {
                resolve();
            }
        } catch (error) {
            if (ticksDone < ticks) {
                setTimeout(callback, 10);
            } else {
                throw error;
            }

        }
    };
    setTimeout(callback, 10);
});

export default EVENTUALLY;
