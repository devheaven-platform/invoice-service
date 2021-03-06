const fs = require( "fs" );
/**
 * Generates a pdf given a invoice and project.
 *
 * @param {Object} invoice the invoice object.
 * @param {Object} project the project object.
 */
const generate = async ( invoice, project, client ) => {
    let content = fs.readFileSync( "src/assets/invoice.html", "utf8" );

    const items = invoice.items.map( item => `<tr class="item"><td>${ item.description }</td><td>$${ item.cost.toFixed( 2 ) }</td></tr>` ).join( "" );

    content = content.replace( "{items}", items );
    content = content.replace( "{project-name}", project.name );
    content = content.replace( "{clientName}", client.name );
    content = content.replace( "{contactFirstname}", client.contact.firstname );
    content = content.replace( "{contactLastname}", client.contact.lastname );
    content = content.replace( "{contactEmail}", client.contact.email );
    content = content.replace( "{invoice-name}", invoice.name );
    content = content.replace( "{invoice-date}", new Date( invoice.createdAt ).toLocaleDateString() );
    content = content.replace( "{total-cost}", invoice.total.toFixed( 2 ) );

    fs.writeFile( `invoices/${ invoice.id }.html`, content, ( err, res ) => {
        if ( err ) {
            return err;
        }
        return res;
    } );
};

module.exports = {
    generate,
};
