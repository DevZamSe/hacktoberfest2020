const p = require('puppeteer')

class clima {

    async clima_m(req, res) {
        let pageClima = 'https://weather.com/es-PE/tiempo/hoy/l/-12.07,-75.21?par=google&temp=c'
        let browser = await p.launch()
        let page = await browser.newPage()

        await page.goto(pageClima, { waitUntil: 'networkidle2' })
/*
        const data = await page.$$eval('table tr[id="ctl00_cphContent_rgTipoCambio_ctl00__0"] td', tds => tds.map((td) => {
            return td.innerText;
        }));*/

          let data = await page.evaluate(() => {

            
            let datos = document.querySelector('span[data-testid="TemperatureValue"]').innerText
              
              //document.querySelector('div.m_table_weather_day_max_temp').innerText



              return { datos }
          })
        console.log(data);

        let resultado = { "Temperatura Huancayo": data['datos']};

        res.send({ success: true, data: resultado })
       // res.send({ success: true, data: data })
        await browser.close()
    }
}

module.exports = new clima();