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
    image_full VARCHAR(255),
    image_sprite VARCHAR(255),
    image_group VARCHAR(255),
    image_x INT(11),
    image_y INT(11),
    image_w INT(11),
    image_h INT(11),
    tags VARCHAR(255) NOT NULL,
    partype VARCHAR(255),
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
    PRIMARY KEY (id)
  )`;

const createRotationsTableQuery = `CREATE TABLE IF NOT EXISTS rotations (
    id INT NOT NULL AUTO_INCREMENT,
    freeChampionIds VARCHAR(500) NOT NULL,
    freeChampionIdsForNewPlayers VARCHAR(500) NOT NULL,
    maxNewPlayerLevel INT NOT NULL,
    PRIMARY KEY (id)
)`;

const insertChampionQuery = `INSERT INTO champions (name, version, id, key, title, blurb, info, image, tags, partype, stats)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertRotationQuery = `INSERT INTO rotations (freeChampionIds, freeChampionIdsForNewPlayers, maxNewPlayerLevel)
                VALUES (?, ?, ?)`;


const insertChampion = async (connection, json) => {
    try {
        const values = [json.name, json.version, json.id, json.key, json.title, json.blurb, JSON.stringify(json.info), JSON.stringify(json.image), JSON.stringify(json.tags), json.partype, JSON.stringify(json.stats)];
        await connection.query(insertChampionQuery, values);
        console.log('Champion added to the table.');
    } catch (err) {
        console.log('Error inserting champion');
        console.log(err);
        throw err;
    }
}

const insertRotation = async (connection, json) => {
    try {
        const values = [JSON.stringify(rotationData.freeChampionIds), JSON.stringify(rotationData.freeChampionIdsForNewPlayers), rotationData.maxNewPlayerLevel];
        await connection.query(insertRotationQuery, values);
        console.log('Rotation added to the table.');
    } catch (err) {
        console.log('Error inserting rotation');
        console.log(err);
        throw err;
    }
}

const create = async (connection) => {
    try {
        console.log('Creating tables...');
        await connection.query(createChampionsTableQuery);
        await connection.query(createRotationsTableQuery);
    } catch (err) {
        console.log('Error creating tables');
        console.log(err);
        throw err;
    }
}

module.exports = {create, insertChampion, insertRotation};

    //All champs: http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json
    //Champ image: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
    //Champ rotation: https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations
    //Champ thumbnail: https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Aatrox_0.jpg