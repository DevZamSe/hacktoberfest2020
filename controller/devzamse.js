const p = require('puppeteer')

class devzamse{

    async test (req, res){
        let kambista = 'https://kambista.com/?gclid=CjwKCAjw_Y_8BRBiEiwA5MCBJu8o8yTEsQYRs0J0duEdnVaXQeLhgusUMUgBh4c7pLm9I49yxm7R9RoCZZMQAvD_BwE'
        let browser = await p.launch()
        let page = await browser.newPage()

        await page.goto(kambista, {waitUntil: 'networkidle2'})
        
        let data = await page.evaluate(()=>{
            let compra = document.querySelector('strong[id="valcompra"]').innerText
            let venta = document.querySelector('strong[id="valventa"]').innerText

            return { compra, venta }
        })

        console.log(data)
        res.send({success: true, data: data})
        await browser.close()
    }
}

module.exports = new devzamse();