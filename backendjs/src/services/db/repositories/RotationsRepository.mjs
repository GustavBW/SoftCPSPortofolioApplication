//Takes care of storing, retrieving and updating champion rotation data.

const simplifiedDate = ()=>{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `${year}-${month}-${day}`;
}

const getBaseValues = (rotation) => {
    
    return [
        JSON.stringify(rotation.freeChampionIds),
        JSON.stringify(rotation.freeChampionIdsForNewPlayers),
        rotation.maxNewPlayerLevel,
        simplifiedDate()
    ];
}

/**
 * Inserts new rotation
 * @param {db connection} connection 
 * @param {any} json 
 */
export const insertRotation = async (connection, json) => {
    try {
        await connection.query(insertRotationQuery, getBaseValues(json));
        console.log('Rotation added to the table.');
    } catch (err) {
        console.log('Error inserting rotation');
        console.log(err);
        throw err;
    }
}

/**
 * Updates existing rotation
 * @param {db connection} connection
 * @param {any} json
 * @param {number} id
 */
export const updateRotation = async (connection, json, id) => {
    try {
        await connection.query(insertRotationQuery, getBaseValues(json));
        console.log('Rotation added to the table.');
    } catch (err) {
        console.log('Error inserting rotation');
        console.log(err);
        throw err;
    }
}

/**
 * Gets the current rotation
 * @param {db connection} connection
 * @description Gets rotation for today
 */
export const getRotationForToday = async (connection, callback) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
  
    const query = `SELECT * FROM rotations WHERE latestUpdate = '${year}-${month}-${day}'`;
    connection.query(query, callback);
}

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