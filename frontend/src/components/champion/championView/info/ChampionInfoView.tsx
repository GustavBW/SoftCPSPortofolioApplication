import React from 'react';
import './ChampionInfoView.css';
import { Champion } from '../../../../ts/types';

interface IChampionInfoView {
    champion: Champion;
}


export default function ChampionInfoView({ champion }: IChampionInfoView) {

    return (
        <div className="ChampionInfoView">
            
            <h2>Info</h2>

            <div className="civ-info-container">
                <div className="civ-info-row">
                    <p className="info-title">Version</p>
                    <p className="info-value">{champion.version}</p>
                </div>
                <div className="civ-info-row">
                    <p className="info-title">Key</p>
                    <p className="info-value">{champion.champion_key}</p>
                </div>
                <div className="civ-info-row">
                    <p className="info-title">Attack</p>
                    <p className="info-value">{champion.attack}</p>
                </div>
                <div className="civ-info-row">
                    <p className="info-title">Defense</p>
                    <p className="info-value">{champion.defense}</p>
                </div>
                <div className="civ-info-row">
                    <p className="info-title">Magic</p>
                    <p className="info-value">{champion.magic}</p>
                </div>
                <div className="civ-info-row">
                    <p className="info-title">Difficulty</p>
                    <p className="info-value">{champion.difficulty}</p>
                </div>
                <div className="civ-info-row">
                    <p className="info-title">Tags</p>
                    <p className="info-value">{champion.tags}</p>
                </div>
                <div className="civ-info-row">
                    <p className="info-title">Resource</p>
                    <p className="info-value">{champion.partype}</p>
                </div>
            </div>
        </div>
    )
}