/**
 * Create a query string from a set of params
 *
 * @param {Object} params the query params to add to the string
 * @returns the create query string
 */
const createQueryString = params => Object.entries( params ).map( ( entry, index ) => {
    const delimiter = index > 0 ? "&" : "?";
    return entry[ 1 ] !== null ? `${ delimiter }${ entry[ 0 ] }=${ entry[ 1 ] }` : null;
} ).join( "" );

module.exports = {
    createQueryString,
};
