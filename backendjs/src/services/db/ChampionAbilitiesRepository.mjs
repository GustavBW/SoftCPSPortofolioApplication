
/**
 * Flattens the nested description objects in the effects array into a string array
 * @param {*} abilityJson 
 */
const formatDescription = (abilityJson) => {
    const effectsArray = abilityJson.effects;
    const descriptionArray = [];
    Object.values(effectsArray).forEach((effect) => {
        descriptionArray.push(effect.description);
    });
    return descriptionArray;
}
    

const getBaseValues = (abilityJson) => {
    return [
        abilityJson.name,
        abilityJson.icon,
        JSON.stringify(formatDescription(abilityJson.description)),
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

export const insertAbility = async (connection, abilityJson, championKey) => {
    try {
        connection.query(insertAbilityQuery, [championKey, ...getBaseValues(abilityJson)], (err, result) => {
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


export const getAbilityByChampionAndName = async (connection, championKey, abilityName, callback) => {
    connection.query("SELECT * FROM abilities WHERE champion_key = ? AND name = ?", [championKey, abilityName], (err, result) => {
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



export const createAbilitiesTableQuery = `CREATE TABLE IF NOT EXISTS abilities (
    id INT(11) NOT NULL AUTO_INCREMENT,
    champion_key VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cost VARCHAR(255) NOT NULL,
    targeting VARCHAR(255) NOT NULL,
    affects VARCHAR(255) NOT NULL,
    spellshieldable Boolean NOT NULL,
    resource VARCHAR(255) NOT NULL,
    damageType VARCHAR(255) NOT NULL,
    spellEffects VARCHAR(255) NOT NULL,
    projectile Boolean NOT NULL,
    occurrence VARCHAR(255) NOT NULL,
    notes TEXT NOT NULL,
    blurb TEXT NOT NULL,
    missileSpeed VARCHAR(255) NOT NULL,
    rechargeRate VARCHAR(255) NOT NULL,
    collisionRadius VARCHAR(255) NOT NULL,
    tetherRadius VARCHAR(255) NOT NULL,
    onTargetCdStatic VARCHAR(255) NOT NULL,
    innerRadius VARCHAR(255) NOT NULL,
    speed VARCHAR(255) NOT NULL,
    width VARCHAR(255) NOT NULL,
    angle VARCHAR(255) NOT NULL,
    castTime VARCHAR(255) NOT NULL,
    effectRadius VARCHAR(255) NOT NULL,
    targetRange VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)`;

const updateAbilityQuery = `
    UPDATE abilities 
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
    WHERE champion_key = ? AND name = ?
`;

const insertAbilityQuery = `
    INSERT INTO abilities (
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
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`;