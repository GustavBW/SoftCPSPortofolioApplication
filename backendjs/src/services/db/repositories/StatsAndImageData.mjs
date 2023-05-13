//Takes care of formating, storing and retrieving champion stats.

export const getStatsForChampion = async (connection, key, callback) => {
    connection.query("SELECT * FROM champion_stats WHERE champion_key = ?", [key], (err, result) => callback(err,result));
}


/**
 * Either updates existing stats or inserts new stats for given champion data.
 * @param {db connection} connection 
 * @param {champion data} data 
 * @param {boolean?} isUpdate 
 */
export const appendStatsAndImage = async (connection, data, isUpdate) => {
    const { full, sprite, group, x, y, w, h } = data.image;
    const imageData = [full, sprite, group, x, y, w, h, data.key];
    if(isUpdate) {
        await connection.query(updateChampionImageDataQuery, imageData);
    } else {  
        await connection.query(insertChampionImageDataQuery, imageData);
    }

    const { hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel, spellblock, spellblockperlevel, 
        attackrange, hpregen, hpregenperlevel, mpregen, mpregenperlevel, crit, critperlevel, attackdamage, 
        attackdamageperlevel, attackspeedperlevel, attackspeed } = data.stats;
    const stats = [hp, hpperlevel, mp, 
        mpperlevel, movespeed, armor,
         armorperlevel, spellblock, 
         spellblockperlevel, attackrange, 
         hpregen, hpregenperlevel, mpregen, 
         mpregenperlevel, crit, critperlevel, 
         attackdamage, attackdamageperlevel, 
         attackspeedperlevel, attackspeed, data.key];
    if(isUpdate) {
        await connection.query(updateChampionStatsQuery, stats);
    } else {
        await connection.query(insertChampionStatsQuery, stats);
    }
}

const insertChampionImageDataQuery = `INSERT INTO champion_image_data (image_full, image_sprite, image_group, image_x, image_y, image_w, image_h, champion_key)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
const updateChampionImageDataQuery = `UPDATE champion_image_data SET image_full = ?, image_sprite = ?, image_group = ?, image_x = ?, image_y = ?, image_w = ?, image_h = ? WHERE champion_key = ?`;
const insertChampionStatsQuery = `INSERT INTO champion_stats (hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel, spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel, mpregen, mpregenperlevel, crit, critperlevel, attackdamage, attackdamageperlevel, attackspeedperlevel, attackspeed, champion_key)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const updateChampionStatsQuery = `UPDATE champion_stats SET hp = ?, hpperlevel = ?, mp = ?, mpperlevel = ?, movespeed = ?, armor = ?, armorperlevel = ?, spellblock = ?, spellblockperlevel = ?, attackrange = ?, hpregen = ?, hpregenperlevel = ?, mpregen = ?, mpregenperlevel = ?,
            crit = ?, critperlevel = ?, attackdamage = ?, attackdamageperlevel = ?, attackspeedperlevel = ?, attackspeed = ? WHERE champion_key = ?`;
export const createChampionStatsTableQuery = `CREATE TABLE IF NOT EXISTS champion_stats (
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
    champion_key INT NOT NULL,
    PRIMARY KEY (id)
)`;
export const createChampionImageDataQuery = `CREATE TABLE IF NOT EXISTS champion_image_data (
    id INT(11) NOT NULL AUTO_INCREMENT,
    image_full VARCHAR(255),
    image_sprite VARCHAR(255),
    image_group VARCHAR(255),
    image_x INT(11),
    image_y INT(11),
    image_w INT(11),
    image_h INT(11),
    champion_key INT NOT NULL,
    PRIMARY KEY (id)
    )`;