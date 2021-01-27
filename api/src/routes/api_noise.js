const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

router.get("/api_noise", (req, res,next) => {
    const {level, val, param} = req.query;


    var values = ''; 

    switch (param) {
        case 'table':
            values = `SELECT a.id ,a.kebisingan, b.kebisingan2, c.kebisingan3 
                      ,DATE_FORMAT(a.waktu, "%d-%M-%Y %H:%m:%S") AS waktu, DATE_FORMAT(b.waktu, "%d-%M-%Y %H:%m:%S") AS waktu2, DATE_FORMAT(c.waktu, "%d-%M-%Y %H:%m:%S") AS waktu3
                      FROM client1 a LEFT JOIN client2 b ON a.id = b.id LEFT JOIN client3 c ON a.id = c.id GROUP BY a.id`;
            break;
        default:
            values = '';
            break;
    }

  var query = '';

  if(level != '')
  {
    query = values;

    mysqlConnection.query(query, (err, result) => {
        if (err) {
          res.status(404).send({ message: "error occured ,"+err+", "+result });
        } else {
          res.status(201).send(result);
        }
      });
  }
  else
  {
    res.status(404).send({ message: "need a parameter" });
  }

});


module.exports = router;
