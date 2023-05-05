import React from "react";
import "./ChampionStatView.css";
import { Champion, ChampionStats } from "../../../../ts/types";
import { getChampionStats } from "../../../../ts/api";

interface IChampionStatView {
    champion: Champion;
}


export default function ChampionStatView({ champion }: IChampionStatView) {
    const [stats, setStats] = React.useState<ChampionStats>();

    React.useEffect(() => {
        getChampionStats(champion.champion_key).then(stats => {
            if(stats === null) {
                return;
            }
            setStats(stats);
        });
    }, []);


    return (
        <div className="ChampionStatView">
            <h2>Stats</h2>
            <div className="csv-body-header">
                <p className="csv-header">Stat</p>
                <p className="csv-header">Base</p>
                <p className="csv-header">Per Level Growth</p>
            </div>
            <div className="csv-body">
                <div className="csv-row">
                    <p className="csv-row-title">Health</p>
                    <p className="csv-row-value">{stats?.hp}</p>
                    <p className="csv-row-value">{stats?.hpperlevel}</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Health / 5s</p>
                    <p className="csv-row-value">{stats?.hpregen}</p>
                    <p className="csv-row-value">{stats?.hpregenperlevel}</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Ressource</p>
                    <p className="csv-row-value">{stats?.hpregen}</p>
                    <p className="csv-row-value">{stats?.hpregenperlevel}</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Ressource / 5s</p>
                    <p className="csv-row-value">{stats?.mpregen}</p>
                    <p className="csv-row-value">{stats?.mpregenperlevel}</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Movement Speed</p>
                    <p className="csv-row-value">{stats?.movespeed}</p>
                    <p className="csv-row-value">N/A</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Armor</p>
                    <p className="csv-row-value">{stats?.armor}</p>
                    <p className="csv-row-value">{stats?.armorperlevel}</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Magic Resist</p>
                    <p className="csv-row-value">{stats?.spellblock}</p>
                    <p className="csv-row-value">{stats?.spellblockperlevel}</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Attack Range</p>
                    <p className="csv-row-value">{stats?.attackrange}</p>
                    <p className="csv-row-value">N/A</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Crit%</p>
                    <p className="csv-row-value">{stats?.crit}</p>
                    <p className="csv-row-value">{stats?.critperlevel}</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Attack Damage</p>
                    <p className="csv-row-value">{stats?.attackdamage}</p>
                    <p className="csv-row-value">{stats?.attackdamageperlevel}</p>
                </div>
                <div className="csv-row">
                    <p className="csv-row-title">Attack Speed</p>
                    <p className="csv-row-value">{stats?.attackspeed}</p>
                    <p className="csv-row-value">{stats?.attackspeedperlevel}</p>
                </div>
            </div>
        </div>
    )
}