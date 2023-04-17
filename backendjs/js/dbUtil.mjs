import config from '../env.json' assert { type: "json" };
const dbConfig = config.dbConfig;
const riotConfig = config.riotConfig;

const createChampionsTableQuery = `CREATE TABLE IF NOT EXISTS champions (
    id INT(11) NOT NULL AUTO_INCREMENT,
    version VARCHAR(255) NOT NULL,
    champion_id VARCHAR(255) NOT NULL,
    champion_key VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    blurb TEXT NOT NULL,

    attack INT(11) NOT NULL,
    defense INT(11) NOT NULL,
    magic INT(11) NOT NULL,
    difficulty INT(11) NOT NULL,
    
    tags VARCHAR(255) NOT NULL,
    partype VARCHAR(255),
    imageUrl VARCHAR(255),
    thumbnailUrl VARCHAR(255),
    PRIMARY KEY (id)
  )`;

const createChampionImageDataQuery = `CREATE TABLE IF NOT EXISTS champion_image_data (
    id INT(11) NOT NULL AUTO_INCREMENT,
    image_full VARCHAR(255),
    image_sprite VARCHAR(255),
    image_group VARCHAR(255),
    image_x INT(11),
    image_y INT(11),
    image_w INT(11),
    image_h INT(11),
    champion_key VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
    )`;

const createRotationsTableQuery = `CREATE TABLE IF NOT EXISTS rotations (
    id INT NOT NULL AUTO_INCREMENT,
    freeChampionIds VARCHAR(500) NOT NULL,
    freeChampionIdsForNewPlayers VARCHAR(500) NOT NULL,
    maxNewPlayerLevel INT NOT NULL,
    PRIMARY KEY (id)
)`;

const createChampionStatsTableQuery = `CREATE TABLE IF NOT EXISTS champion_stats (
    id INT(11) NOT NULL AUTO_INCREMENT,
    hp INT(11) NOT NULL,
    hpperlevel INT(11) NOT NULL,
    mp INT(11) NOT NULL,
    mpperlevel INT(11) NOT NULL,
    movespeed INT(11) NOT NULL,
    armor INT(11) NOT NULL,
    armorperlevel FLOAT NOT NULL,
    spellblock INT(11) NOT NULL,
    spellblockperlevel FLOAT NOT NULL,
    attackrange INT(11) NOT NULL,
    hpregen INT(11) NOT NULL,
    hpregenperlevel FLOAT NOT NULL,
    mpregen INT(11) NOT NULL,
    mpregenperlevel FLOAT NOT NULL,
    crit INT(11) NOT NULL,
    critperlevel INT(11) NOT NULL,
    attackdamage INT(11) NOT NULL,
    attackdamageperlevel FLOAT NOT NULL,
    attackspeedperlevel FLOAT NOT NULL,
    attackspeed FLOAT NOT NULL,
    champion_key VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)`;

const insertChampionQuery = `INSERT INTO champions (version, champion_id, champion_key, name, title, blurb, attack, defense, magic, difficulty, tags, partype, imageUrl, thumbnailUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertRotationQuery = `INSERT INTO rotations (freeChampionIds, freeChampionIdsForNewPlayers, maxNewPlayerLevel)
            VALUES (?, ?, ?)`;
const insertChampionImageDataQuery = `INSERT INTO champion_image_data (image_full, image_sprite, image_group, image_x, image_y, image_w, image_h, champion_key)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
const updateChampionImageDataQuery = `UPDATE champion_image_data SET image_full = ?, image_sprite = ?, image_group = ?, image_x = ?, image_y = ?, image_w = ?, image_h = ? WHERE champion_key = ?`;
const insertChampionStatsQuery = `INSERT INTO champion_stats (hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel, spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel, mpregen, mpregenperlevel, crit, critperlevel, attackdamage, attackdamageperlevel, attackspeedperlevel, attackspeed, champion_key)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const updateChampionStatsQuery = `UPDATE champion_stats SET hp = ?, hpperlevel = ?, mp = ?, mpperlevel = ?, movespeed = ?, armor = ?, armorperlevel = ?, spellblock = ?, spellblockperlevel = ?, attackrange = ?, hpregen = ?, hpregenperlevel = ?, mpregen = ?, mpregenperlevel = ?,
            crit = ?, critperlevel = ?, attackdamage = ?, attackdamageperlevel = ?, attackspeedperlevel = ?, attackspeed = ? WHERE champion_key = ?`;

const updateChampionQuery = `
  UPDATE champions 
  SET 
    version = ?, 
    champion_id = ?, 
    champion_key = ?, 
    name = ?, 
    title = ?, 
    blurb = ?, 
    attack = ?, 
    defense = ?, 
    magic = ?, 
    difficulty = ?, 
    tags = ?, 
    partype = ?, 
    imageUrl = ?, 
    thumbnailUrl = ?
  WHERE id = ?`;

const getMaxOfNQuery = (table, column) => {
    return `SELECT * FROM ${table} WHERE ${column} = (SELECT MAX(${column}) FROM ${table})`;
}

const appendStatsAndImage = async (connection, json, isUpdate) => {
    const { full, sprite, group, x, y, w, h } = json.image;
    const imageData = [full, sprite, group, x, y, w, h, json.key];
    if(isUpdate) {
        await connection.query(updateChampionImageDataQuery, imageData);
    } else {  
        await connection.query(insertChampionImageDataQuery, imageData);
    }

    const { hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel, spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel, mpregen, mpregenperlevel, crit, critperlevel, attackdamage, attackdamageperlevel, attackspeedperlevel, attackspeed } = json.stats;
    const stats = [hp, hpperlevel, mp, 
        mpperlevel, movespeed, armor,
         armorperlevel, spellblock, 
         spellblockperlevel, attackrange, 
         hpregen, hpregenperlevel, mpregen, 
         mpregenperlevel, crit, critperlevel, 
         attackdamage, attackdamageperlevel, 
         attackspeedperlevel, attackspeed, json.key];
    if(isUpdate) {
        await connection.query(updateChampionStatsQuery, stats);
    } else {
        await connection.query(insertChampionStatsQuery, stats);
    }
}

/**
 * Performs string operations to derive image urls from champion data
 * @param {json data} champion 
 * @returns { imageUrl, thumbnailUrl }
 */
const deriveImageUrls = (champion) => {
    const champImgName = champion.image.full.split('.')[0];
    const imageUrl = riotConfig.routeForSplashArt.url + champImgName + "_0.jpg";
    const thumbnailUrl = riotConfig.routeForChampionIcon.url + champImgName + "_0.jpg";
    return { imageUrl, thumbnailUrl };
}

/**
 * updates champion row id "id"
 * @param {db connection} connection 
 * @param {json champion data} data 
 * @param {int} id 
 */
const updateChampion = async (connection, data, id) => {
    try {
        const { imageUrl, thumbnailUrl } = deriveImageUrls(data);
        const { attack, defense, magic, difficulty } = data.info;
        const champion = [data.version, data.id, data.key, data.name, data.title, data.blurb, attack, defense, magic, difficulty, data.tags.join(','), data.partype, imageUrl, thumbnailUrl, id];
        await connection.query(updateChampionQuery, champion, (err, result) => {
            if (err) {
                console.log("ERROR updating champion with key: " + data.key + " and name: " + data.name);
                console.log(err);
            }
        });
        appendStatsAndImage(connection, data, true);
    }
    catch (err) {
        console.log(err);
    }
}

/**
 * Inserts new champion if not exists, otherwise updates existing champion
 * @param {db connection} connection 
 * @param {json champion data} champ 
 * @returns 
 */
export const insertOrUpdateChampion = async (connection, champ) => {
    try {
        const existingEntry = await getChampionByKey(connection, champ.key, (err, result) => {
            if (err) {
                console.log('Error checking if champion exists');
                console.log(err);
                throw err;
            }
            if (result[0] && result[0].id){
                updateChampion(connection, champ, result[0].id);
                return;
            }else{
                const { imageUrl, thumbnailUrl } = deriveImageUrls(champ);
                const { attack, defense, magic, difficulty } = champ.info;
                const champion = [champ.version, champ.id, champ.key, champ.name, champ.title, champ.blurb, attack, defense, magic, difficulty, champ.tags.join(','), champ.partype, imageUrl, thumbnailUrl];
                connection.query(insertChampionQuery, champion, (err, result) => {
                    if (err) {
                        console.log('Error inserting champion');
                        console.log(err);
                        throw err;
                    }
                    appendStatsAndImage(connection, champ,false);
                });
            }
        });
    } catch (err) {
        console.log('Error inserting or updating champion');
        console.log(err);
        throw err;
    }
}

export const insertRotation = async (connection, json) => {
    try {
        const values = [JSON.stringify(json.freeChampionIds), JSON.stringify(json.freeChampionIdsForNewPlayers), json.maxNewPlayerLevel];
        await connection.query(insertRotationQuery, values);
        console.log('Rotation added to the table.');
    } catch (err) {
        console.log('Error inserting rotation');
        console.log(err);
        throw err;
    }
}

/**
 * Drops db, then recreates to wipe all data. Then creates tables
 * @param {db connection} connection 
 */
export const create = async (connection) => {
    try {
        console.log('Dropping db if exists...');
        await connection.query("DROP DATABASE IF EXISTS " + dbConfig.database + ";");
        await connection.query("CREATE DATABASE " + dbConfig.database + ";");
        await connection.query("USE " + dbConfig.database + ";");

        console.log('Creating tables...');
        await connection.query(createChampionsTableQuery);
        await connection.query(createRotationsTableQuery);
        await connection.query(createChampionImageDataQuery);
        await connection.query(createChampionStatsTableQuery);
    } catch (err) {
        console.log('Error creating tables');
        console.log(err);
        throw err;
    }
}

export const useDB = async (connection) => {
    try {
        await connection.query("USE " + dbConfig.database + ";");
    } catch (err) {
        console.log('Error using database');
        console.log(err);
        throw err;
    }
}

export const getChampionByKey = async (connection, key, callback) => {
    connection.query("SELECT * FROM champions WHERE champion_key = ?", [key], (err, result) => callback(err,result));
}

export const getStatsForChampion = async (connection, key, callback) => {
    connection.query("SELECT * FROM champion_stats WHERE champion_key = ?", [key], (err, result) => callback(err,result));
}

/**
 * Retrives the row which has the highest value for the given column in a given table
 * @param {string} table - table name
 * @param {string} column - column name
 */
export const getMaxOfN = async (connection, table, column, callback) => {
    connection.query(getMaxOfNQuery(table, column), (err, result) => callback(err,result));
}


