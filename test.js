const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function counterTest() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    try {
        await driver.get('http://10.0.0.6:5500/counter/index.html');

        // Localizar los elementos de la página counter
        let counter = await driver.findElement(By.css('.content span'));
        let decreaseButton = await driver.findElement(By.css('.buttons.decrease'));
        let resetButton = await driver.findElement(By.css('.buttons.reset'));
        let increaseButton = await driver.findElement(By.css('.buttons.increase'));

        // Función para esperar
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Incrementar el contador hasta 30
        for (let i = 0; i < 28; i++) {
            await increaseButton.click();
            await sleep(500);
        }
        let valueAt40 = await counter.getText();
        console.log('Valor después de incrementar hasta 40:', valueAt40);

        // El contador se reinicia a 0
        await resetButton.click();
        await sleep(500); 
        let resetValue = await counter.getText();
        console.log('Valor después de RESET:', resetValue);

        // El contador bajará a 10
        for (let i = 0; i < 15; i++) {
            await decreaseButton.click();
            await sleep(500);
        }
        let valueAt10 = await counter.getText();
        console.log('Valor después de decrementar a 10:', valueAt10);

        // Capturar una pantalla
        await driver.takeScreenshot().then(function (image, err) {
            require('fs').writeFileSync('counter-final.png', image, 'base64');
        });

        console.log('Prueba completada. Captura guardada como "counter-final.png".');

    } catch (err) {
        console.error('Error durante la prueba:', err);
    } finally {
        // Cierra el navegador
        await driver.quit();
    }
})();