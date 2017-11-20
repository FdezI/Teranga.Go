# Teranga.Go

Memoria [disponible en el repositorio](https://github.com/FdezI/Teranga.Go/blob/master/Memoria.pdf).

## Instalación

#### Requisitos previos:

- **Nodejs:** ```# apt-get install nodejs```
- **MySQL:** ```# apt-get install mysql-server```

#### Descarga del proyecto:

* Mediante el uso de git:

  ```$ git clone https://github.com/FdezI/Teranga.Go.git```

* A través de la [interfaz web](https://github.com/FdezI/Teranga.Go), utilizando el botón "[Download ZIP](https://github.com/FdezI/Teranga.Go/archive/master.zip)"


#### Puesta en marcha de la base de datos de prueba:

```$  mysql -u root -p[root_password] < Teranga.Go/tfgdata.sql```

La instrucción anterior creará la base de datos necesaria así como creará al usuario (tfg) con los permisos pertinentes para que el servidor pueda conectarse a la misma.
(Recomendado poner un espacio antes de la órden para no registrar la misma, junto con la contraseña, en el historial)


## Ejecución

```$ cd Teranga.Go/ && nodejs server.js```


## Acceso

Desde cualquier navegador (recomendado chrome):

`localhost:8080`

Para acceder a la API REST (web-service), basta con realizar una petición *GET*, *POST* o *PUT* al servidor, dependiendo de la acción deseada (recomendado usar la aplicación **POSTMAN**)


## Actualización a la última versión:

Desde la misma carpeta que se ejecutó el clone:

```$ cd Teranga.Go/ && git pull```
