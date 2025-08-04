# IGDB Proxy Server API

## Is a workaround if you have issues with CORS when accesing the IGDB API for a Web Project by making a Proxy Server

### How to use

#### Backend Setup

- Make sure you have Node JS installed on your machine
- open a terminal in this directory
- modify the `.env` file with your IGDB API credentials
  - `USER_ID` is your [Client ID from IGDB](https://api-docs.igdb.com/#account-creation)
  - `TOKEN` is your [Access Token from IGDB](https://api-docs.igdb.com/#authentication)
- run `npm install` to install the dependencies
- run `npm run start` to start the server

#### Access from frontend

- Make a fetch request to `localhost:3000/fetchIGDBData` (default)
  - ApiNode the Endpoint you want to get (games, age_rating...) \
    https://api-docs.igdb.com/#endpoints
  - Query: The Query you want to run. \
    fields name, rating, rating_count; sort rating_count desc;

### Example in Javascript

```javascript
const ApiNode = "games";
const Query = "fields *; sort rating_count desc;";
try {
  const response = await fetch("http://localhost:3000/fetchIGDBData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ApiNode, Query }),
  });
  const data = await response.json();
  return data;
} catch (error) {
  console.error(error);
  return error;
}
```
