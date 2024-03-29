//Takes care of formating, storing and retrieving champion skin data.

/**
 * Returns a value array (without champion_key) for the skin table
 * @param {skin json} skinData 
 * @returns 
 */
const getBaseValuesOfSkin = (skinData) => {
    return [
        skinData.name,
        skinData.id,
        skinData.isBase,
        skinData.availability,
        skinData.formatName,
        skinData.lootEligible,
        skinData.cost,
        skinData.sale,
        skinData.distribution,
        skinData.rarity,
        skinData.lore,
        skinData.release,
        JSON.stringify(skinData.set),
        skinData.splashPath,
        skinData.uncenteredSplashPath,
        skinData.tilePath,
        skinData.newEffects,
        skinData.newAnimations,
        skinData.newRecall,
        skinData.newVoice,
        skinData.newQuotes,
        JSON.stringify(skinData.voiceActor),
        JSON.stringify(skinData.splashArtist),
    ];
}

/**
 * 
 * @param {db connection} connection 
 * @param {string} champion 
 * @param {string} skinName 
 * @param {(res, err) => {}} callback 
 */
export const getSkinByChampionAndName = async (connection, champion, skinName, callback) => {
    const query = `SELECT * FROM champion_skins WHERE champion_key = ? AND name = ?`;
    connection.query(query, [champion, skinName], (err, result) => callback(err, result));
}

export const updateSkin = async (connection, skinData, championKey) => {
    connection.query(updateSkinQuery, [championKey, ...getBaseValuesOfSkin(skinData), championKey, skinData.name]);
}

export const insertSkin = async (connection, skinData, championKey) => {
    connection.query(insertSkinQuery, [championKey, ...getBaseValuesOfSkin(skinData)]);
}

/**
 * Inserts or updates skin
 * @param {db connection} connection 
 * @param {json} skinData - skin data 
 * @param {string} championKey - champion_key 
 */
export const insertOrUpdateSkin = async (connection, skinData, championKey) => {
    try {
        const existingEntry = await getSkinByChampionAndName(connection, championKey, skinData.name, (err, result) => {
            if (err) {
                console.log('Error checking if skin exists');
                console.log(err);
                throw err;
            }
            if (result[0] && result[0].id){
                updateSkin(connection, skinData, result[0].champion_key);
                return;
            }else{
                insertSkin(connection, skinData, championKey);
                return;
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const createSkinsTableQuery = `CREATE TABLE IF NOT EXISTS champion_skins (
    champion_key VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    id INT NOT NULL,
    isBase BOOLEAN NOT NULL,
    availability VARCHAR(255) NOT NULL,
    formatName VARCHAR(255) NOT NULL,
    lootEligible BOOLEAN NOT NULL,
    cost INT NOT NULL,
    sale INT NOT NULL,
    distribution VARCHAR(255),
    rarity VARCHAR(255) NOT NULL,
    lore TEXT NOT NULL,
    releaseDate VARCHAR(255) NOT NULL,
    skinLine VARCHAR(255),
    splashPath VARCHAR(255) NOT NULL,
    uncenteredSplashPath VARCHAR(255) NOT NULL,
    tilePath VARCHAR(255) NOT NULL,
    newEffects BOOLEAN NOT NULL,
    newAnimations BOOLEAN NOT NULL,
    newRecall BOOLEAN NOT NULL,
    newVoice BOOLEAN NOT NULL,
    newQuotes BOOLEAN NOT NULL,
    voiceActor VARCHAR(255),
    splashArtist VARCHAR(255),
    PRIMARY KEY (id)
    )`;

const insertSkinQuery = `INSERT INTO champion_skins (champion_key, name, id, isBase, availability, formatName, lootEligible, cost, sale, 
    distribution, rarity, lore, releaseDate, skinLine, splashPath, uncenteredSplashPath, tilePath, newEffects, newAnimations, 
    newRecall, newVoice, newQuotes, voiceActor, splashArtist)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const updateSkinQuery = `UPDATE champion_skins SET champion_key = ?, name = ?, id = ?, isBase = ?, availability = ?, formatName = ?, lootEligible = ?, cost = ?, sale = ?, distribution = ?, rarity = ?, lore = ?, releaseDate = ?, skinLine = ?, splashPath = ?, uncenteredSplashPath = ?, tilePath = ?, newEffects = ?,
    newAnimations = ?, newRecall = ?, newVoice = ?, newQuotes = ?, voiceActor = ?, splashArtist = ? 
    WHERE champion_key = ? AND name = ?`;


