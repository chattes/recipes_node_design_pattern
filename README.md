# Recipies
## Requirements

We'd like you to build a simple Recipes API. The API **MUST** conform to REST
practices and **MUST** provide the following functionality:

- List, create, read, update, and delete Recipes
- - Search recipes
- - Rate recipes

### Endpoints

Your application **MUST** conform to the following endpoint structure and return the HTTP status codes appropriate to each operation. Endpoints specified as protected below **SHOULD** require authentication to view. The method of authentication is up to you.

##### Recipes

| Name   | Method      | URL                    | Protected |
| ---    | ---         | ---                    | ---       |
| List   | `GET`       | `/recipes`             | ✘         |
| Create | `POST`      | `/recipes`             | ✓         |
| Get    | `GET`       | `/recipes/{id}`        | ✘         |
| Update | `PUT/PATCH` | `/recipes/{id}`        | ✓         |
| Delete | `DELETE`    | `/recipes/{id}`        | ✓         |
| Rate   | `POST`      | `/recipes/{id}/rating` | ✘         |

An endpoint for recipe search functionality **MUST** also be implemented. The HTTP method and endpoint for this **MUST** be clearly documented.

### Schema

- **Recipe**
    - Unique ID
    - Name
    - Prep time
    - Difficulty (1-3)
    - Vegetarian (boolean)

Additionally, recipes can be rated many times from 1-5 and a rating is never overwritten.


#### Running the Solution

The application is Containerized.

To start the application

```
docker-compose up

```

Docker version used

```
docker --version
Docker version 19.03.12-ce, build 48a66213fe
```

##### Search API

The Search API is a general search api. To search for a recipe use `/search`
route with Query string

| Name   | Method      | URL                    | Protected |
| ---    | ---         | ---                    | ---       |
| Search | `GET`       | `/search`              | ✘         |

```
http://localhost:3000/search?entity=recipe&qs=<string>
```
The Search will match partial strings and return result.


#### Protected Routes

To access protected routes.
> Generate a JWT Token by calling `/auth/token` route and pass in the `user`


| Name   | Method      | URL                    | Protected |
| ---    | ---         | ---                    | ---       |
| Auth   | `POST`      | `/auth/token`          |           |

**Example**

```
curl --request POST \
  --url http://localhost:3000/auth/token \
	  --header 'accept: application/json' \
		  --header 'content-type: application/json' \
			  --data '{
					"user": "JOBGET"
					}
					'
```


##### Database Administration

You can Administer the database using **Adminer**

`http://localhost:3004`


