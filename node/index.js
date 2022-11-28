const express = require('express')
const app = express()
const router = express.Router();
const { uniqueNamesGenerator, names } = require('unique-names-generator');
const port = 3000
const config = {
    db:{
        host: 'db',
        user: 'root',
        password: 'root',
        database:'nodedb'
    },
    generator: {
        dictionaries: [names]
      }
};

const mysql = require('mysql')
const con = mysql.createConnection(config.db )

router.get('/', (req, res) => {
  try {
    
    // const query_createtable = "CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))" 
    // con.query(query_createtable);

    const query_insert = "INSERT INTO people (name) VALUES('" + uniqueNamesGenerator(config.generator) + "')";
    con.query(query_insert);

    const query_select = "SELECT * FROM people";
    con.query(query_select, (err, result, fields) => {
      if (err) throw err;
      res.send("<div><h1>Full Cycle Rocks!</h1>" + formatResponse(result) + "</div>");
    });
  } catch (error) {
    throw error
  }
});

app.use('/', router);


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

const formatResponse = (result) =>
  "<ul>" +
  result.map(values =>
    "<li>" + values.name + "</li>"
  ).join('') +
  "</ul>";