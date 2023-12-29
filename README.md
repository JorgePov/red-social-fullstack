
# Prueba FullStack - Jorge Poveda



## Breve explicacion

Desarrollo de una red social tipo foro, donde las personas puedes relizar publicaciones para compartir con la comunidad.

## Vesiones 

**Front:** Angular 17, node v18, Tailwind Css

**Backend:** Nest.js, node v18

**DataBase:** Postgres:14


## Instalaccion Docker

Inicializacion con dockers en la raiz del proyecto ejecutar

```bash
  docker-compose up -d --build
```

Este comando deberia permitir ya el ingreso a toda la prueba

- Endpoint front: http://localhost:3000
- Endpoint back: http://localhost:4200
- Conexion a bd http://localhost:5432


## Instalaccion Manual
Instalacion manual usar node v18

en la carpeta raiz del proyecto ejecutamos los siguientes comandos.

Backend 
- Lista de comandos
```bash
  cd backend
  yarn install || npm install
  yarn start:dev || npm start:dev
```

Frontend
```bash
  cd frontend
  yarn install || npm install
  yarn start || npm start
```


Base de datos
```bash
  docker-compose start postgres
```
  
Ingresar a http://localhost:4200




## Tests


No se implementaron test, pero en futura version se agregaran.

