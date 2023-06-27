# Trips API

Trips API es una aplicación que permite gestionar viajes basándose en información de ubicaciones y tiempos.

## Tecnologías utilizadas

- Node.js: Un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome.
- Express.js: Un marco de aplicación web para Node.js diseñado para construir aplicaciones web y API.
- MongoDB: Una base de datos de documentos, que permite trabajar con datos de forma flexible y escalable.
- Docker: Una plataforma que permite simplificar el proceso de automatización del despliegue de aplicaciones dentro de contenedores de software.

## Características

- Almacenar viajes con información de inicio y fin, como dirección, latitud, longitud y tiempo.
- Calcular la duración, distancia, cantidad de excesos de velocidad y el cuadro delimitador de un viaje.

## Instalación

1. Clona el repositorio:

    git clone https://github.com/rodriguezrod1/Api-trips.git



2. Instala las dependencias:

    npm install


## Uso

Para iniciar la aplicación en modo de desarrollo, ejecuta:

    npm run dev


Para iniciar la aplicación en modo de producción, ejecuta:

    npm start



## Uso con Docker

1. Construye la imagen de Docker:

    docker build -t trips-api .


2. Inicia un contenedor con la imagen creada:

    docker run -p 3000:3000 trips-api

La aplicación ahora debería estar disponible en `http://localhost:3000`.




## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

    npm test




## Dependencias

- [axios](https://www.npmjs.com/package/axios) - Para realizar solicitudes HTTP.
- [cors](https://www.npmjs.com/package/cors) - Para habilitar CORS en la API.
- [dotenv](https://www.npmjs.com/package/dotenv) - Para cargar variables de entorno desde un archivo `.env`.
- [express](https://www.npmjs.com/package/express) - Para crear la API y manejar solicitudes HTTP.
- [haversine](https://www.npmjs.com/package/haversine) - Para calcular la distancia entre dos puntos geográficos.
- [mongodb](https://www.npmjs.com/package/mongodb) - Para interactuar con la base de datos MongoDB.
- [mongoose](https://www.npmjs.com/package/mongoose) - Para modelar y gestionar los datos de la base de datos.

## Dependencias de desarrollo

- [jest](https://www.npmjs.com/package/jest) - Para ejecutar pruebas unitarias y de integración.
- [nodemon](https://www.npmjs.com/package/nodemon) - Para reiniciar automáticamente la aplicación durante el desarrollo.
- [supertest](https://www.npmjs.com/package/supertest) - Para realizar pruebas de la API.

## Autor

    Lcdo. Rod Rodríguez <rodriguezrod1@gmail.com>

## Licencia

    ISC

