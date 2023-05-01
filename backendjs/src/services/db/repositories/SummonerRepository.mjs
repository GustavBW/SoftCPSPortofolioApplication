const getBaseValues = (summoner) => {
    return [
        summoner.name,
        summoner.leaguePoints,
        summoner.wins,
        summoner.losses,
        summoner.iconURL,
        summoner.level
    ];
}

export const insertOrUpdateSummoner = async (summoner, connection) => {
    const result = new Promise((resolve, reject) => {
        connection.query(insertSummonerQuery, getBaseValues(summoner), (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
    return result;
}

export const insertSummonerQuery = `
    INSERT INTO summoner (
        name,
        leaguePoints,
        wins,
        losses,
        iconURL,
        level
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        leaguePoints = VALUES(leaguePoints),
        wins = VALUES(wins),
        losses = VALUES(losses),
        iconURL = VALUES(iconURL),
        level = VALUES(level)
`; //why did I only figure this out now...


export const createSummonerTableQuery = `
    CREATE TABLE IF NOT EXISTS summoner (
        name VARCHAR(150) NOT NULL UNIQUE,
        leaguePoints INT NOT NULL,
        wins INT NOT NULL,
        losses INT NOT NULL,
        iconURL VARCHAR(150) NOT NULL,
        level INT NOT NULL,
        PRIMARY KEY (name)
    ) ENGINE=InnoDB;
`;