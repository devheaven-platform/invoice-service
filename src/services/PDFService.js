const path = require( "path" );
const fs = require( "fs" );
const puppeteer = require( "puppeteer" );

async function generatePDF( data ) {
    const content = fs.readFileSync( "./invoice.html", "utf8" );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent( content );
    await page.setViewport({ width: 1920, height: 1080});
    await page.emulateMedia( "print" );
    await page.pdf( {
        path: "invoice.pdf",
        format: "A4",
        printBackground: true,
    } );
    await browser.close();
}

module.exports = {
    generatePDF,
};
