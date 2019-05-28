const fs = require( "fs" );
const wkhtmltopdf = require( "wkhtmltopdf" );
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

    wkhtmltopdf( content, { output: `invoices/${ invoice.id }.pdf` } );
};

module.exports = {
    generate,
};
