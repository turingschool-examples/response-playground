# Response Playground API

A simple API with contrived routes to simulate various responses.

## Documentation

**Note:** If you are sending information in the request body, then you need to supply the request header: `Content-Type: application/json`

When you see `:id` in the URL parameter, this can be any positive integer value (1,2,3,500, etc.).

| URL | Verb | Request Body | Response |
|-----|------|--------------|----------|
| `/` | GET | none | 200 response with data in body |
| `/responses` | POST | `{name: "String"}` | 201 status code with data in body |
| `/responses` | POST | none | 400-level status code with error message in body |
| `/responses/:id` | DELETE | none | 204 status code with no data in body |
| `/someNotFound/:id` | GET | none | 200 status code or 404 status code depending on the "id" requested |
| `/serverError` | GET | none | 500-level status code with error message in body |
