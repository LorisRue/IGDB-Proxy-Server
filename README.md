# IGDB Proxy Server API

## Is a workaround if you have issues with CORS when accesing the IGDB API for a Web Project by making a Proxy Server

### How to use
#### Backend Setup 

 * Make sure you have Node JS installed on your machine
 * open a terminal in this directory
 * run `npm install` to install the dependencies
 * run `node index.js` to start the server
 
#### Access from frontend

 * Make a fetch request to localhost:8000/fetchIGDBData (default)
 * Make sure to include UserId, Token, ApiNode, Query in the body
    * UserId: The Id for your twitch developer account \
    https://api-docs.igdb.com/#account-creation
    * Token: The token for your twitch developer account \
    https://api-docs.igdb.com/#authentication
    * ApiNode the Endpoint you want to get (games, age_rating...) \
    https://api-docs.igdb.com/#endpoints
    * Query: The Query you want to run. \
    fields name, rating, rating_count; sort rating_count desc;

### Example in Javascript

    const UserId = YOUR USERid;
    const Token = YOUR TOKEN;
    const ApiNode = 'games';
    const Query = 'fields *; sort rating_count desc;';
    try {
        const response = await fetch(
            'http://localhost:8000/fetchIGDBData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { UserId, Token, ApiNode, Query })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }