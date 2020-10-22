const p = require('puppeteer')
//var text = document.querySelector('div[_ngcontent-c15]').innerText
//var arrayText = document.querySelector('div[_ngcontent-c10]').innerText
//var sunedu = document.querySelector('app-list-carreras[_ngcontent-c7]').innerText


class sunedu{
    async test (req, res){
        
        let _ = req.body;

        var yara = _.carrera.replace(" ", "%20%");

        let kambista = "http://tuni.pe/programas?term="+yara
        let browser = await p.launch()
        let page = await browser.newPage()

        await page.goto(kambista, {waitUntil: 'networkidle2'})
        
        let data = await page.evaluate(()=>{
            let carrera = document.querySelector('div[_ngcontent-c10]').innerText
            //let venta = document.querySelector('strong[id="valventa"]').innerText

            return { carrera }
        })

        console.log(data)
        res.send({success: true, data: data})
        await browser.close()
    }
}
module.exports = new sunedu()