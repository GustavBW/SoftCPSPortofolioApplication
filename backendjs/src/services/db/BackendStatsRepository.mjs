






export const createFetchTimesTableQuery = `CREATE TABLE IF NOT EXISTS fetch_times (
    id INT(11) NOT NULL AUTO_INCREMENT,
    fetch_time_ms INT,
    timestmap DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
)`;
