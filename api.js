var organigrama = require('./organigrama');
var editar = require('./db');
var guardar = require('./db')

const db = require('./db');




let express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors');

const { lista } = require('./db');
const res = require('express/lib/response');


const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);




//Buscar
router.route("/lista/buscar").post((request, response) => {
    let organigrama = {...request.body }
    db.lista(organigrama).then(result => {
        response.json(result);
    })
});


router.route("/lista/editar").post((request, response) => {
    let editar = {...request.body };
    db.editar(editar).then(result => {
        response.json(result);
    });
});

router.route("/lista/guardar").post((request, response) => {
    let guardar = {...request.body };
    db.guardar(guardar).then(result => {
        response.json("Ok");
    });

});

const port = process.env.port || 5939;
app.listen(port, () => {
    console.log(`http://localhost:${port}/api/`);
})