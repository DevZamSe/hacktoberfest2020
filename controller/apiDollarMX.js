const puppeteer = require('puppeteer');

const URL = {
    EL_DOLAR: 'https://www.eldolar.info/es-MX/mexico/dia/hoy',
    INVESTING: 'https://mx.investing.com/currencies/usd-mxn'
}

const DATA_ERROR = {
    success: false,
    data: "No me vayas a Hackear"
}

class ApiDollarMX {

    async compras(req, res) {
        let _ = req.body
        console.log({ modena: _.modena, lugar: _.lugar });

        if (_.modena == 'dollar') {
            console.log('Si es un dollar')
            if (_.lugar == 'eldolar') {
                console.log('Logica de El Dolar')
                let browser = await puppeteer.launch()
                let page = await browser.newPage()

                await page.goto(URL.EL_DOLAR, { waitUntil: 'networkidle2' })

                let data = await page.evaluate(() => {

                    let compra = document.querySelector('div[class="exchangeRate"] p:nth-child(1) span').innerText
                    let venta = document.querySelector('div[class="exchangeRate"] p:nth-child(2) span').innerText

                    return { compra, venta }
                })

                console.log(data)
                res.send({ success: true, data: data })
                await browser.close()

            } else if (_.lugar == 'investing') {
                console.log('Logica de investing')
                let browser = await puppeteer.launch()
                let page = await browser.newPage()

                await page.goto(URL.INVESTING, { waitUntil: 'networkidle2' })

                let data = await page.evaluate(() => {

                    let compra = document.querySelectorAll('div[id="quotes_summary_secondary_data"] li:nth-child(2)')[0].querySelector('span:nth-child(2) span:nth-child(1)').innerText
                    let venta = document.querySelectorAll('div[id="quotes_summary_secondary_data"] li:nth-child(2)')[0].querySelector('span:nth-child(2) span:nth-child(2)').innerText

                    return { compra, venta }
                })

                console.log(data)
                res.send({ success: true, data: data })
                await browser.close()

            } else {
                console.log('Error')
                res.send(DATA_ERROR)
            }
        } else {
            console.log('Error')
            res.send(DATA_ERROR)
        }
    }

}

module.exports = new ApiDollarMX()