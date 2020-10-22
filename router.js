
const express = require('express');
const router = express.Router();
const devzamse = require('./controller/devzamse');
const sunedu = require('./controller/sunedu')

//checkStatus
router.get("/",(req,res)=>{res.send({status:true})});

//webScrapping
router.get('/f', devzamse.test);
router.post('/carreras', sunedu.test);

module.exports = router;