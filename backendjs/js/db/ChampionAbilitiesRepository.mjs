/**
 * Inserts or updates ability data for a champion
 * @param {db connection} connection 
 * @param {json} abilityData - ability data for a single ability 
 * @param {string} championKey - champion_key 
 */
export const insertOrUpdateAbility = async (connection, abilityData, championKey) => {
    try {
        const existingEntry = await getAbilityByChampionAndName(connection, championKey, abilityData, (err, result) => {
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



const createAbilitiesTableQuery = `CREATE TABLE IF NOT EXISTS abilities (
    id INT(11) NOT NULL AUTO_INCREMENT,
    champion_key VARCHAR(255) NOT NULL,
)`;