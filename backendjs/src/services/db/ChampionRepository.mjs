import {appendStatsAndImage} from './StatsAndImageData.mjs';
import config from '../../../env.json' assert { type: "json" };
const riotConfig = config.riotConfig;

export const getChampionByKey = async (connection, key, callback) => {
    connection.query("SELECT * FROM champions WHERE champion_key = ?", [key], (err, result) => callback(err,result));
}

/**
 * Performs string operations to derive image urls from champion data
 * @param {json data} champion 
 * @returns { imageUrl, thumbnailUrl }
 */
const deriveImageUrls = (champion) => {
    let champImgName = champion.image.full.split('.')[0];
    if(champImgName == "Fiddlesticks"){
        champImgName = "FiddleSticks"; //why riot. why.
    }
    const imageUrl = riotConfig.routeForSplashArt.url + champImgName + "_0.jpg";
    const thumbnailUrl = riotConfig.routeForChampionIcon.url + champImgName + "_0.jpg";
    return { imageUrl, thumbnailUrl };
}

/**
 * Returns a value array of the base champion values
 * @param {base champion info} champ 
 * @returns 
 */
const getBaseValues = (champ) => {
    const { imageUrl, thumbnailUrl } = deriveImageUrls(champ);
    const { attack, defense, magic, difficulty } = champ.info;
    return [champ.version, champ.id, champ.key, champ.name, champ.title, champ.blurb, 
        attack, defense, magic, difficulty, champ.tags.join(','), champ.partype, imageUrl, thumbnailUrl];
}    


/**
 * updates champion row id "id"
 * @param {db connection} connection 
 * @param {json champion data} data 
 * @param {int} id 
 */
const updateChampion = async (connection, data, id) => {
    try {
        await connection.query(updateChampionQuery, [...getBaseValues(data), id], (err, result) => {
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
 * @param {db connection} connection 
 * @param {json data} champ 
 */
const insertChampion = async (connection, champ) => {
    connection.query(insertChampionQuery, getBaseValues(champ), (err, result) => {
        if (err) {
            console.log('Error inserting champion');
            console.log(err);
            throw err;
        }
        appendStatsAndImage(connection, champ,false);
    });
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
                insertChampion(connection, champ);
                return;
            }
        });
    } catch (err) {
        console.log('Error inserting or updating champion');
        console.log(err);
        throw err;
    }
}

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
const insertChampionQuery = `INSERT INTO champions (version, champion_id, champion_key, name, title, blurb, attack, defense, magic, difficulty, tags, partype, imageUrl, thumbnailUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
export const createChampionsTableQuery = `CREATE TABLE IF NOT EXISTS champions (
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