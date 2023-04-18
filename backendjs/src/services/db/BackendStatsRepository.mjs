



export const insertFetchTimeNow = async (connection, fetchTimeMs) => {
    try {
        connection.query(insertFetchTimeQuery, [fetchTimeMs, new Date()], (err, result) => {
            if (err) {
                console.log('Error inserting fetch time');
                console.log(err);
                throw err;
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const createFetchTimesTableQuery = `CREATE TABLE IF NOT EXISTS fetch_times (
    id INT(11) NOT NULL AUTO_INCREMENT,
    fetch_time_ms INT,
    timestamp DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
)`;

const insertFetchTimeQuery = `INSERT INTO fetch_times (fetch_time_ms, timestamp) VALUES (?, ?);`;

