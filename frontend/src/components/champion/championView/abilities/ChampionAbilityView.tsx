import React from 'react';
import './ChampionAbilityView.css';
import { Champion } from '../../../../ts/types';

interface IChampionAbilityView {
    champion: Champion;
}

export default function ChampionAbilityView({ champion }: IChampionAbilityView) {


    return (
        <div className="ChampionAbilityView">
            hi
        </div>
    )

}