const path = require( "path" );
const fs = require( "fs" );
const puppeteer = require( "puppeteer" );

async function generatePDF( data ) {
    const content = fs.readFileSync( "apth", "utf8" );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent( content );
    await page.emulateMedia( "screen" );
    await page.pdf( {
        path: "filename",
        format: "A4",
        printBackground: true,
    } );
    await browser.close();
}

module.exports = {
    generatePDF,
};
