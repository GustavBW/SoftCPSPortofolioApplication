const simplifiedDate = ()=>{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month}-${day}`;
}

export const insertRotation = async (connection, json) => {
    try {
        const values = [JSON.stringify(json.freeChampionIds), JSON.stringify(json.freeChampionIdsForNewPlayers), json.maxNewPlayerLevel, simplifiedDate()];
        await connection.query(insertRotationQuery, values);
        console.log('Rotation added to the table.');
    } catch (err) {
        console.log('Error inserting rotation');
        console.log(err);
        throw err;
    }
}

export const updateRotation = async (connection, json, id) => {
    try {
        const values = [JSON.stringify(json.freeChampionIds), JSON.stringify(json.freeChampionIdsForNewPlayers), json.maxNewPlayerLevel,simplifiedDate()];
        await connection.query(insertRotationQuery, values);
        console.log('Rotation added to the table.');
    } catch (err) {
        console.log('Error inserting rotation');
        console.log(err);
        throw err;
    }
}

export const getRotationForToday = async (connection) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
  
    const query = `SELECT * FROM rotations WHERE latestUpdate = '${year}-${month}-${day}'`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          console.log('Error getting rotation for today');
          console.log(err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };

/**
 * Inserts new rotation if no rotation exists for this date, otherwise updates existing rotation
 * @param {db connection} connection 
 * @param {rotation json} json 
 */

export const insertOrUpdateRotation = async (connection, json) => {
    try {
        const existingEntry = await getRotationForToday(connection, (err, result) => {
            if (err) {
                console.log('Error checking if rotation exists');
                console.log(err);
                throw err;
            }
            if (result.length > 0){
                updateRotation(connection, json, result[0].id);
                return;
            }else{
                insertRotation(connection, json);
                return;
            }
        });
    } catch (err) {
        console.log('Error inserting or updating rotation');
        console.log(err);
        throw err;
    }
}

export const createRotationsTableQuery = `CREATE TABLE IF NOT EXISTS rotations (
    id INT NOT NULL AUTO_INCREMENT,
    freeChampionIds VARCHAR(500) NOT NULL,
    freeChampionIdsForNewPlayers VARCHAR(500) NOT NULL,
    maxNewPlayerLevel INT NOT NULL,
    latestUpdate VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)`;

const insertRotationQuery = `INSERT INTO rotations (freeChampionIds, freeChampionIdsForNewPlayers, maxNewPlayerLevel, latestUpdate)
            VALUES (?, ?, ?, ?)`;

const updateRotationQuery = `UPDATE rotations SET freeChampionIds = ?, freeChampionIdsForNewPlayers = ?, maxNewPlayerLevel = ?, 
    latestUpdate = ? WHERE id = ?`;