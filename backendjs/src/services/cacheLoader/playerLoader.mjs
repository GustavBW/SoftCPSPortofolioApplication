import config from '../../../env.json' assert { type: "json" };
import { loadSummoner } from '../db.mjs';

const appConfig = config.appConfig;
const riotConfig = config.riotConfig;

export const forEachAppendInfo = async (summonerListPromise) => {

    const summonerList = await summonerListPromise;

    for(let i = 0; i < summonerList.length; i++) {
        setTimeout(() => {
            const summoner = summonerList[i];

            fetch(riotConfig.routeForSummonerInfo, {
                mode: 'no-cors',
                headers: riotConfig.routeForSummonerInfo.public ? {} : riotConfig.authHeader
                }).then((res) => {
                    res.json().then((json) => {
                        summoner.iconURL = json.profileIconId;
                        summoner.level = json.summonerLevel;
                        loadSummoner(summoner);
                    });
                });


        }, i * 1000);
    }

    summonerList.forEach((summoner) => {
        //get pictures from: https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/<name>
        //by appending it to: http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/<profileIconId>.png
        //append to congealed object
        //save to cache
    });
}

/**
 * Loads the highest ranked players, then appends some information on them and stores them.
 * @returns Promise
 */

export const updateHighestRankedPlayers = async () => {
    const timeA = new Date().getTime();

    return await fetch(riotConfig.routeForChallengerPlayers.url, {
        mode: 'no-cors',
        headers: riotConfig.routeForChallengerPlayers.public ? {} : riotConfig.authHeader
    }).then((res) => {
        forEachAppendInfo(res.json());
    }).catch((err) => {
        console.log('Error loading challenger players');
        console.log(err);
    });

    //get players: https://euw1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I - defaults to ?page=1
    //extract summoner name list
    //get pictures from: https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/<name>
    //by appending it to: http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/<profileIconId>.png
    //append to congealed object
    //save to cache
    //nb 2 of those are not publicly accessible so delay them

}