# User Api Spec

## Register User Api

Endpoint: POST api/users

Requset Body:

```json
{
  "username": "Ikhsan901",
  "Password": "*****",
  "name": "Toha Ikhsan"
}
```

Response Body Success:

```json
{
  "data": {
    "Username": "ikhsan901",
    "name": "Toha Ikhsan"
  }
}
```

Response Body Erros:

```json
{
  "errors": "Username Already Registered"
}
```

## Login User Api

Endpoint: POST api/users/login

Headers:

- Authorization: token

Requset Body:

```json
{
  "username": "Ikhsan901",
  "Password": "*****"
}
```

Requset Body Success:

```json
{
  "data": {
    "token": "uniqe-token"
  }
}
```

Response Body Erros:

```json
{
  "errors": "Username or Password Wrong"
}
```

## Update User Api

Endpoint: PATCH api/users/current

Requset Body:

```json
{
  "name": "Ikhsan new", //optional
  "Password": "***** new" //optional
}
```

Requset Body Success:

```json
{
  "data": {
    "username": "Ikhsan901",
    "name": "Ikhsan new"
  }
}
```

Response Body Erros:

```json
{
  "errors": "name max lenght 100"
}
```

## Get User Api

Endpoint: GET api/users/current

Headers:

- Authorization: token

Requset Body:

```json
{
  "username": "Ikhsan901",
  "Password": "*****"
}
```

Requset Body Success:

```json
{
  "data": {
    "token": "uniqe-token"
  }
}
```

Response Body Erros:

```json
{
  "errors": "User is Not Found"
}
```

## Update User Api

Endpoint: PATCH api/users/current

Headers:

- Authorization: token

Requset Body Success:

```json
{
  "data": {
    "username": "Ikhsan901",
    "name": "Toha Ikhsan"
  }
}
```

Response Body Erros:

```json
{
  "errors": "Unauthorized"
}
```

## Logout User Api

Endpoint: DELETE api/users/logout

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
  "errors": "Unauthorized"
}
```
