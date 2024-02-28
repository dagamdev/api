# My API

API privada desarrollada para implementar características en mis páginas web y reutilizar funcionalidades que requieran de un Backend.

## Perfil de Discord
Se puede obtener mi perfil de Discord y ver algunos cambios en tiempo real. Para esto se consume la API de Discord para conectarme a mi cuenta y obtener algunos datos que un bot de Discord no podria obtener de un usuario.
Para mostrar los cambios en tiempo real, se utiliza un bot de Discord y socket.io. El bot escucha un evento que se activa cada vez que un usuario modifica su perfil.

## Analíticas Web
Esta funcionalidad proporciona el conteo visitas, likes y usuarios que visitan mis páginas webs. Para ello, se utiliza una base de datos de tipo no relacional (MongoDB) para almacenar las visitas, likes y usuarios que visitan cualquira de mis páginas Web que utilicen esta característica de mi API.
Las analiticas cambian en tiepo real gracias a socket.io.
Para contar los usuarios se crea un **UUID** para el navegador que se almacena en el **localStorage** y se utiliza para determinar si el usuario ha dado un like o no.
Además, hay un cooldown de visitas de **10** minutos, por lo que un usurio puede recargar la página cuantas veces quiera y solo se sumarán visitas si ha pasado el tiempo de cooldown.

## Ruta Web
Esta ruta devuelve datos de las páginas proporcionadas, como su icono, entre otros datos.
Por el momento solo existe la ruta `/web/icon?url=https://web.com`, que obtiene el icono de la página Web que se le proporcione a través del parámetro de consulta *url*.
En caso de no poder obtener el icono de la página, por defecto se devolvera un **SVG** similar al que se muestra en las pestañas de los navegadores cuando la página no tiene un icono.
Las páginas cuyo icono no se puede obtener son aquellas que se construyen en el cliente o las que no devuelven el header desde el servidor.

### Tecnologías
- TypeScript
- Node.js
- Express.js
- Socket.io
- Discord.js
- Mongoose
- Zod
