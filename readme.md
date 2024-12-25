# URL Shortener Backend

This is a simple backend implementation of a URL Shortener built with Node.js and Express. The service allows users to shorten long URLs and retrieve the original long URL using the generated short ID.

## Features
- **Create Short URL**: Convert a long URL into a shortened version.
- **Fetch Original URL**: Retrieve the original long URL using the short ID.
- **Rate Limiter**: Ensures that users can make a maximum of 50 requests within a 15-minute window.

## Temporary Storage
The data is temporarily stored in an in-memory array:
```javascript
const urls = []; // Schema: { _id, shortId, longURL }
```
No database integration is implemented yet.

## Postman Collection
The repository includes a Postman collection with two requests:
1. **Create Short URL**: API to generate a short URL from a long URL.
2. **Fetch Long URL**: API to fetch the original long URL using the short ID.

To use the collection, import the Postman collection file provided in the collections folder and test the APIs interactively.
