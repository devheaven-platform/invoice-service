const fs = require( "fs" );
const puppeteer = require( "puppeteer" );

/**
 * Generates a pdf given a invoice and project.
 *
 * @param {Object} invoice the invoice object.
 * @param {Object} project the project object.
 */
const generate = async ( invoice, project ) => {
    let content = fs.readFileSync( "src/assets/invoice.html", "utf8" );

    const items = invoice.items.map( item => `<tr class="item"><td>${ item.description }</td><td>$${ item.cost.toFixed( 2 ) }</td></tr>` ).join( "" );

    content = content.replace( "{items}", items );
    content = content.replace( "{project-name}", project.name );
    content = content.replace( "{invoice-name}", invoice.name );
    content = content.replace( "{invoice-date}", new Date( invoice.createdAt ).toLocaleDateString() );
    content = content.replace( "{total-cost}", invoice.total.toFixed( 2 ) );

    const browser = await puppeteer.launch( { headless: true, args: [ "--no-sandbox", "--disable-dev-shm-usage" ] } );
    const page = await browser.newPage();
    await page.setContent( content );
    await page.setViewport( { width: 1920, height: 1080 } );
    await page.emulateMedia( "print" );
    await page.pdf( {
        path: `invoices/${ invoice.id }.pdf`,
        format: "A4",
        printBackground: true,
    } );
    await browser.close();
};

module.exports = {
    generate,
};
