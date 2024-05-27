# Activity Api Spec

## Create Activity Api

Endpoint: POST api/activities

Headers:

- Authorization: token

Requset Body:

```json
{
  "data": {
    "title": "test",
    "information": "test",
    "day": "test",
    "date": "2024 01 01",
    "time": "12.00"
  }
}
```

Requset Body Success:

```json
{
  "data": {
    "id": 1,
    "title": "test",
    "information": "test",
    "day": "test",
    "date": "2024 01 01",
    "time": "12.00"
  }
}
```

Response Body Erros:

```json
{
  "errors": "Email is Not Valid Format"
}
```

## Update Activity Api

Endpoint: PUT api/activities/:activityId

Headers:

- Authorization: token

Requset Body:

```json
{
  "data": {
    "title": "test",
    "information": "test",
    "day": "test",
    "date": "2024 01 01",
    "time": "12.00"
  }
}
```

Requset Body Success:

```json
{
  "data": {
    "id": 1,
    "title": "test",
    "information": "test",
    "day": "test",
    "date": "2024 01 01",
    "time": "12.00"
  }
}
```

Response Body Erros:

```json
{
  "errors": "Email is Not Valid Format"
}
```

## Get Activity Api

Endpoint: GET api/activities/:activityId

Headers:

- Authorization: token

Requset Body Success:

```json
{
  "data": {
    "id": 1,
    "title": "test",
    "information": "test",
    "day": "test",
    "date": "2024 01 01",
    "time": "12.00"
  }
}
```

Response Body Erros:

```json
{
  "errors": "Activity is Not Found"
}
```

## Search Activity Api

Endpoint: GET api/activities

Headers:

- Authorization: token

Query Params:

- title: search by title using like, optional
- day: serach by day using like, optional

Requset Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "title": "test",
      "information": "test",
      "day": "test",
      "date": "2024 01 01",
      "time": "12.00"
    },
    {
      "id": 2,
      "title": "test",
      "information": "test",
      "day": "test",
      "date": "2024 01 01",
      "time": "12.00"
    }
  ]
}
```

Response Body Erros:

```json
{
  "errors": "Activity is Not Found"
}
```

## Remove Activity Api

Endpoint: DELETE api/activities/:activityId

Headers:

- Authorization: token

Requset Body Success:

```json
{
  "data": "OK"
}
```

Response Body Erros:

```json
{
  "errors": "Activity is Not Found"
}
```
