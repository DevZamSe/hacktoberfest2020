const p = require('puppeteer')

class tipocambiosbs {

    async tcsbs_m(req, res) {
        let pagesbs = 'https://www.sbs.gob.pe/app/pp/SISTIP_PORTAL/Paginas/Publicacion/TipoCambioPromedio.aspx'
        let browser = await p.launch()
        let page = await browser.newPage()

        await page.goto(pagesbs, { waitUntil: 'networkidle2' })

        const data = await page.$$eval('table tr[id="ctl00_cphContent_rgTipoCambio_ctl00__0"] td', tds => tds.map((td) => {
            return td.innerText;
        }));

        /*  let data = await page.evaluate(() => {
              let datos = document.querySelector('tr[id="ctl00_cphContent_rgTipoCambio_ctl00__0"]').innerText



              return { datos }
          })*/
        console.log(data);

        let resultado = { "Moneda": data[0], "Compra": data[1], "Venta": data[2] };

        res.send({ success: true, data: resultado })
        await browser.close()
    }
}

module.exports = new tipocambiosbs();