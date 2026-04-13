const GRAPHQL_URL = 'http://localhost:8000/graphql';

export const graphqlFetch = async (query, variables = {}) => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const data = await response.json();
    return data;
};