const cTable = require('console.table');

async function viewEmployees(connection, table) {
    let rows;
    const SQL_STATEMENT = `SELECT id, CONCAT(id, ' - ', first_name, ' ', last_name) FROM ?`;
    try {
        rows = await connection.query(SQL_STATEMENT, table, function (error, results, fields) {
        if (error) throw error;
        console.table(results);
        return results;
        })
    } catch (error) {
        console.log(error);
    };
} 

module.exports = {
    viewEmployees
};