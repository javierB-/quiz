// postgres://bycyznmgiasvqg:EtPMkbuKJtpd0s1Trt2r9LTTkv@ec2-54-83-20-177.compute-1.amazonaws.com:5432/db0ej7b54thi52
// models/models.js
var path =require('path');

// Postgres DATABASE_URL = pstgres://user:passwd@host:port/database
// SALite   DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name   = (url[6]||null);
var user      = (url[2]||null);
var pwd       = (url[3]||null);
var protocol  = (url[1]||null);
var dialect   = (url[1]||null);
var port      = (url[5]||null);
var host      = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
			{dialect: protocol,
       protocol: protocol,
       port:  port,
       host: host,
       storage:  storage, // solo SQLite (.env)
       omitNull: true     // solo Postgress
       }  
);

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportar definicion de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function (count){
	if (count === 0) { // la tabla se inicializa solo si esta vacia
	  Quiz.create({ pregunta: 'Capital de Italia',
			respuesta: 'Roma'
		      }) 
	  .success(function(){console.log('Base de datos inicializada')});
	};
   });
});













