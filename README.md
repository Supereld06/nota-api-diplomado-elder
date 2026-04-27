# API de Notas - Backend

## Descripción

API RESTful desarrollada en Node.js para la gestión de notas.
Permite a los usuarios autenticados crear, visualizar, actualizar y eliminar notas, aplicando validación de propiedad y buenas prácticas de diseño de APIs.

---

## Arquitectura

El proyecto implementa una arquitectura en capas:

Controller → Manejo de solicitudes HTTP
Service → Lógica de negocio
Repository → Acceso a datos
Middleware → Autenticación y validaciones

---

##  Autenticación

Se utiliza JWT (JSON Web Token).

Todas las rutas protegidas requieren:

Authorization: Bearer {token}

---

##  Base URL

http://localhost:3000/api/v1

---

##  Endpoints

###  Autenticación

#### Registro

POST /auth/register

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

---

#### Login

POST /auth/login

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

---

###  Notas

#### Crear nota

POST /notes

```json
{
  "title": "Mi nota",
  "content": "Contenido"
}
```

Respuesta:

* 201 Created

---

#### Obtener notas del usuario

GET /notes

 Respuesta:

* 200 OK

---

#### Obtener nota por ID

GET /notes/:id

---

#### Actualizar nota

PUT /notes/:id

```json
{
  "title": "Nueva nota"
}
```

---

#### Eliminar nota

DELETE /notes/:id

---

## Versionado

La API utiliza versionado mediante URI:

/api/v1/

Esto permite mantener compatibilidad en futuras versiones.

---

## Manejo de errores

Las respuestas siguen un formato estándar:

```json
{
  "status": 403,
  "error": "Forbidden",
  "message": "Unauthorized"
}
```

---

## Seguridad

* Autenticación mediante JWT
* Validación de usuario propietario de la nota
* Restricción de acceso a recursos

---

## Pruebas

Las pruebas fueron realizadas en Postman validando:

* Autenticación (login)
* Autorización (acceso por usuario)
* Manejo de errores
* Respuestas REST correctas

---

## Tecnologías utilizadas

* Node.js
* Express
* MySQL
* MongoDB
* JWT

---

## Autor
Condorcet Gomez Juan Elder
Proyecto desarrollado como práctica académica aplicando principios RESTful y arquitectura backend.
