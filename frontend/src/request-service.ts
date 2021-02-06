type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const requestService = async (endpoint: string, method: HTTPMethod, payload?: Object) => {
    return fetch(
        endpoint,
        {
            method: method,
            body: payload ? JSON.stringify(payload) : null,
            headers: { 'Content-Type': 'application/json' },
        },
    )
    .then(response => {
        return response;
    })
    .then(response => response.json())
    .then(response => response)
    .catch(err => ({ success: false, error: err, data: {} }));
}

export default requestService;