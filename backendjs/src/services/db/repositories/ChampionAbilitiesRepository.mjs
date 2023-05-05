// Takes care of formating, storing and retrieving champion ability data


/**
 * Since RIOT is using a character that this version of MySQL does not support, 
 * that character is replaced with a similar one that is supported
 * @param {string} string 
 * @returns 
 */
const sanitizeASCII = (string) => {
    return string.replace(/\u2212|\u2013|\u2014/g, "-");
}

const toMySQLBoolean = (boolean) => {
    

/**
 * Flattens the nested description objects in the effects array into a string array
 * @param {string} abilityJson 
 */
const formatEffectDescriptions = (effectsArray) => {
    const descriptionArray = [];
    Object.values(effectsArray).forEach((effect) => {
        descriptionArray.push(sanitizeASCII(effect.description));
    });
    return descriptionArray;
}
    

const getBaseValues = (abilityJson) => {
    return [
        abilityJson.name,
        abilityJson.icon,
        JSON.stringify(formatEffectDescriptions(abilityJson.effects)),
        abilityJson.cost,
        abilityJson.targeting,
        abilityJson.affects,
        abilityJson.spellshieldable,
        abilityJson.resource,
        abilityJson.damageType,
        abilityJson.spellEffects,
        abilityJson.projectile,
        abilityJson.occurrence,
        abilityJson.notes,
        abilityJson.blurb,
        abilityJson.missileSpeed,
        abilityJson.rechargeRate,
        abilityJson.collisionRadius,
        abilityJson.tetherRadius,
        abilityJson.onTargetCdStatic,
        abilityJson.innerRadius,
        abilityJson.speed,
        abilityJson.width,
        abilityJson.angle,
        abilityJson.castTime,
        abilityJson.effectRadius,
        abilityJson.targetRange
    ]
}

/**
 * Inserts an ability into the db
 * @param {db connection} connection 
 * @param {any} abilityJson 
 * @param {number} championKey 
 */
export const insertAbility = async (connection, abilityJson, championKey) => {
    try {
        const baseValues = getBaseValues(abilityJson);
        connection.query(insertAbilityQuery, [championKey, ...baseValues], (err, result) => {
            if (err) {
                console.log('Error inserting ability');
                console.log(err);
                throw err;
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

/**
 * Updates an ability into the db
 * @param {db connection} connection 
 * @param {any} abilityJson 
 * @param {number} championKey 
 */
export const updateAbility = async (connection, abilityJson, championKey) => {
    try {
        connection.query(updateAbilityQuery, [...getBaseValues(abilityJson), championKey, abilityJson.name], (err, result) => {
            if (err) {
                console.log('Error updating ability');
                console.log(err);
                throw err;
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

/**
 * Retrieves a specific ability from the database
 * @param {db connection} connection 
 * @param {string} abilityName 
 * @param {number} championKey 
 */
export const getAbilityByChampionAndName = async (connection, championKey, abilityName, callback) => {
    connection.query("SELECT * FROM champion_abilities WHERE champion_key = ? AND name = ?", [championKey, abilityName], (err, result) => {
        callback(err, result);
    });
}

/**
 * Inserts or updates ability data for a champion
 * @param {db connection} connection 
 * @param {json} abilityData - ability data for a single ability 
 * @param {string} championKey - champion_key 
 */
export const insertOrUpdateAbility = async (connection, abilityData, championKey) => {
    try {
        const existingEntry = await getAbilityByChampionAndName(connection, championKey, abilityData.name, (err, result) => {
            if (err) {
                console.log('Error checking if abilities exists');
                console.log(err);
                throw err;
            }
            if (result[0] && result[0].id){
                updateAbility(connection, abilityData, result[0].champion_key);
                return;
            }else{
                insertAbility(connection, abilityData, championKey);
                return;
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}



export const createAbilitiesTableQuery = `CREATE TABLE IF NOT EXISTS champion_abilities (
    id INT(11) NOT NULL AUTO_INCREMENT,
    champion_key VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    description VARCHAR(2000),
    cost VARCHAR(255),
    targeting VARCHAR(255),
    affects VARCHAR(255),
    spellshieldable Boolean,
    resource VARCHAR(255),
    damageType VARCHAR(255),
    spellEffects VARCHAR(255),
    projectile Boolean,
    occurrence VARCHAR(255),
    notes TEXT,
    blurb TEXT,
    missileSpeed VARCHAR(255),
    rechargeRate VARCHAR(255),
    collisionRadius VARCHAR(255),
    tetherRadius VARCHAR(255),
    onTargetCdStatic VARCHAR(255),
    innerRadius VARCHAR(255),
    speed VARCHAR(255),
    width VARCHAR(255),
    angle VARCHAR(255),
    castTime VARCHAR(255),
    effectRadius VARCHAR(255),
    targetRange VARCHAR(255),
    PRIMARY KEY (id)
)`;

const updateAbilityQuery = `
    UPDATE champion_abilities 
    SET
        name = ?,
        icon = ?,
        description = ?,
        cost = ?,
        targeting = ?,
        affects = ?,
        spellshieldable = ?,
        resource = ?,
        damageType = ?,
        spellEffects = ?,
        projectile = ?,
        occurrence = ?,
        notes = ?,
        blurb = ?,
        missileSpeed = ?,
        rechargeRate = ?,
        collisionRadius = ?,
        tetherRadius = ?,
        onTargetCdStatic = ?,
        innerRadius = ?,
        speed = ?,
        width = ?,
        angle = ?,
        castTime = ?,
        effectRadius = ?,
        targetRange = ?
    WHERE champion_key = ? AND name = ?;
`;

const insertAbilityQuery = `
    INSERT INTO champion_abilities (
        champion_key,
        name,
        icon,
        description,
        cost,
        targeting,
        affects,
        spellshieldable,
        resource,
        damageType,
        spellEffects,
        projectile,
        occurrence,
        notes,
        blurb,
        missileSpeed,
        rechargeRate,
        collisionRadius,
        tetherRadius,
        onTargetCdStatic,
        innerRadius,
        speed,
        width,
        angle,
        castTime,
        effectRadius,
        targetRange
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
`;