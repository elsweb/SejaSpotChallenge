[![N|Solid](https://drive.google.com/uc?id=1ZXPQV9o8xHnqCj49Yo5eUmfm0HaXbfDt)](http://elsweb.com.br)
![N|Solid](https://drive.google.com/uc?id=1-lFd2viOP0urQQ_p9_fKngQ4R02Y3rgD)<share-social>

SejaSpotChallenge versão 1.0
========================
Projeto de Competição de SejaSpot, um serviço de alimentação de blog por API.

Alimente seu blog por API, faça consultas por postagens, alimente com JSON suas páginas.

Bancos de dados suportados
-------------------
* MySQL

Dependências
------------

### Runtime
* Node.js v8.9.x+
* MySQL Server

### Packages
* bluebird
* body-parser
* database-cleaner
* debug
* express
* express-load
* express-validator
* http
* jade
* moment
* mysql
* url
* util

### Desenvolvimento / Testes
* mocha

Instalação de dependências
-----------
```shell
$ npm install --save
```

Uso
------
###### Digite um dos comandos abaixo para iniciar o servidor, e acesse localhost:3030
```shell
$ node app
$ nodemon app
```

Uso API
------
###### Inicie o servidor, abra outro terminal e digite um dos comandos abaixo para recuperar os dados.
```shell
$ node api-getpost
$ node api-getcategory
$ node api-getauthor
```

###### Configuração
------
Crie um bando de dados, importe o arquivo database.sql e configure como abaixo no arquivo config/mysql.js o banco.

```javascript
if(!process.env.NODE_ENV){
		var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'user-name',
		password : 'password',
		database : 'database-name'
		});
	return conn;
	}
```

### Executando testes com mocha
###### Atenção o teste limpa todo o bando de dados então CUIDADO.

Uso
------
```shell
$ NODE_ENV='dev' node_modules/mocha/bin/mocha
```

###### Configuração para teste
------
Crie outro bando de dados, importe o arquivo database.sql e configure como abaixo no arquivo config/mysql.js o banco.

```javascript
if (process.env.NODE_ENV == 'dev'){
		var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'test-use-name',
		password : 'test-password',
		database : 'test-database-name'
		});
	return conn;
	}
```

Author
------
* elsWeb Freelancer (<http://elsweb.com.br/> ou <https://www.facebook.com/officialelsweb/>)
* Emanuel L.D. Silva (https://www.linkedin.com/in/elsweb)

Skills used
========================

![N|Solid](https://drive.google.com/uc?id=16diPsCWSBdPUyz1NFtKZSBOlXntTxUjT)<html>
![N|Solid](https://drive.google.com/uc?id=1UgOq7QEQ2BEVSpVUeAzExY43nRAI8eWn)<css>
![N|Solid](https://drive.google.com/uc?id=1oncjdSGvUdUbs0t2W8XdSnVU1tvygpE0)<js>
![N|Solid](https://drive.google.com/uc?id=1q-21b8hJYoZ2IYAUGbE_4lwoiiqO7Rw8)<jquery>
![N|Solid](https://drive.google.com/uc?id=1XoJD92NPBQ9h0jdZDbWjtij3dT_WLFnH)<mysql>
![N|Solid](https://drive.google.com/uc?id=1rjZ6szYNzcu6d5nAVT7CvNx_TgGtvRey)<nodejs>
![N|Solid](https://drive.google.com/uc?id=1rKr9mc3EEE8-HIV44DAv-7FEb1RUZLwZ)<mocha-nodejs>
![N|Solid](https://drive.google.com/uc?id=1UO-CDMugAnOMb238zgJrOkphB9jn8vR1)<jade-nodejs>
![N|Solid](https://drive.google.com/uc?id=1eb_OLqKHFUPs6x-Ysv62feXHFyLbPRA1)<json>
![N|Solid](https://drive.google.com/uc?id=17mICnyngBMzHsD2mWofK1S--4YYondcY)<git>
![N|Solid](https://drive.google.com/uc?id=1F6xcgfgNN5LxPtFOQhJG73qsatbJqZlL)<github>
![N|Solid](https://drive.google.com/uc?id=1ldC35vLAOBM1YxuK8BLqYOeeZLp62T9y)<sublimetext>