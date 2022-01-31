const express = require ('express');
const Database = require ('./mysqlcon');
var cors=require ('cors');

const app = express();
app.use (cors());

const port = 3001;

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Servidor OK !!!');
})

app.get('/ asistente_mto', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * FROM maquinaria', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})

app.post('/ asistente_mto', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO MAQUINARIA    
                (id_maquina,marca, estado, modelo, fabricacion, matricula, costo, responsable, seccion, serie) VALUES
                 (?,?,?,?,?,?,?,?,?,?)`

                   cn.execute(
                   query, [body.idasignatura, body.nombre],
                   function (err, results, fields) {
                   if (err) {
                    res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );



})



app.post('/maquinaria', (req, res)=>{
    const body = req.body;
    res.json(body)
})


app.listen(port, () => {
    console.log('localhost:'+port);
})