# bbc_migrantes

#####MUY IMPORTANTE: El proyecto está en sus inicios por lo que es MUY inestable
#####MUY IMPORTANTE: El estilo de la página está sin "toquetear"



##Instalación

####Requisitos previos:

- **Nodejs:** ```# apt-get install nodejs```
- **MySQL:** ```# apt-get install mysql-server```

####Descarga del proyecto:

```$ git clone https://github.com/FdezI/bbc_migrantes.git bbc_migrantes```

####Puesta en marcha de la base de datos de prueba:

```$  mysql -u root -p[root_password] < bbc_migrantes/tfgdata.sql```

La instrucción anterior creará la base de datos necesaria así como creará al usuario con los permisos pertinentes para que el servidor pueda conectarse a la misma.


##Ejecución

```$ cd bbc_migrantes/ && nodejs server.js```


##Acceso

Desde cualquier navegador (recomendado chrome):

`localhost:8080`

Para acceder a la API REST (web-service), basta con realizar una petición *GET*, *POST* o *PUT* al servidor, dependiendo de la acción deseada (recomendado usar la aplicación **POSTMAN**)
