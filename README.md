# Forex API

This app contains all of the endpoints for a currency exchange (Forex) database. Currently, the top 10 most traded currencies are available.

Prices listed in the database are listed in USD, and are static unless manually updated by an admin. The main funciton of the database is as dummy data for demo applications, so live and accurate pricing is not a priority. Automated price updates may be implemented in the future.

## Access

url: http://localhost:8082/currency/

## Data Structure

Data Fields:

```
code: String
name: String
symbol: String
lastPrice: Double

```
 Example response:
```
{
    "code": "USD",
    "name": "United States Dollars",
    "symbol": "US$",
    "lastPrice": 1,
}
```

### API Endpoints
- GET (all books) / POST (add book): `http://localhost:8082/api/books`
- DELETE: `http://localhost:8082/api/books/:id`
- PATCH (add book to cart): `http://localhost:8082/api/books/cart/add/:id`
- PATCH (remove book from cart): `http://localhost:8082/api/books/cart/remove/:id`

-GET “/”
--Returns details on all currencies
-POST “/”
--Requires admin access
--Adds currency type
--Body requires: “code”: (String), “name”: (String), “symbol”: (String), “price”: (Number)
--Returns added currency
-GET “/:Code”
--Where Code is the ISO 4217 Code for that currency(E.g. USD)
--Returns detail on single currency
-PUT “/:Code”
--Where Code is the ISO 4217 Code for that currency(E.g. USD)
--Requires admin access
--Updates that currency
--Returns updated currency
-DELETE “/:Code”
--Where Code is the ISO 4217 Code for that currency(E.g. USD)
--Requires admin access
--Removes currency type from database
--Returns removed currency


