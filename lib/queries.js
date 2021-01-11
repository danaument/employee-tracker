function viewEmployees(connection, table) {
    const SQL_STATEMENT = `SELECT id, CONCAT(id, ' - ', first_name, ' ', last_name) FROM ?`;
    connection.query(SQL_STATEMENT, table, function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}

module.exports = {
    viewEmployees
};