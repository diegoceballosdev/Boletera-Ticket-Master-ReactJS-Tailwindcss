const wrapPromise = (promise) => {
    let status = 'pending';
    let result;

    // Suspender la promesa hasta que se resuelva o rechace:
    let suspender = promise.then(
        (r) => {
            status = 'success';
            result = r;
        }
    ).catch(
        (e) => {
            status = 'error';
            result = e;
        }
    );

    return {
        read() {
            if (status === 'pending') {
                // La promesa aun no se ha resuelto, lanzamos el suspender:
                throw suspender;
            } else if (status === 'error') {
                // La promesa se rechazo, lanzamos el error:
                throw result;
            } else if (status === 'success') {
                // La promesa se resolvio, devolvemos el resultado:
                return result;
            }
        }
    }
};

export default wrapPromise;