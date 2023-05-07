import React from 'react';
import './ChampionAbilityView.css';
import { Ability, Champion } from '../../../../ts/types';
import { getChampionAbilities } from '../../../../ts/api';

interface IChampionAbilityView {
    champion: Champion;
}

export default function ChampionAbilityView({ champion }: IChampionAbilityView) {
    const [abilities, setAbilities] = React.useState<Ability[]>([]);
    const [selectedAbility, setSelectedAbility] = React.useState<Ability | null>(null);

    React.useEffect(() => {
        getChampionAbilities(champion.champion_key).then((res) => {
            setAbilities(res);
        });
    }, [champion]);

    const getSelected = () => {
        if (selectedAbility !== null && selectedAbility !== undefined) {
            return (
                <>
                    <p className="ability-description">{selectedAbility.description}</p>
                </>
            );
        }else{
            return (
                <>
                    <p className="ability-description">Select an ability to see more information</p>
                </>
            );
        }
    }


    return (
        <div className="ChampionAbilityView">
            <h1 className="ability-title"> {selectedAbility != null ? selectedAbility.name : "Abilities"} </h1>

            <div className="selected-ability-container">
                {getSelected()}
            </div>

            <div className="champion-abilities-row">
                {abilities.map((ability) => (
                    <button className="ability-button"
                        key={ability.id}
                        onClick={() => {
                            if(selectedAbility === ability) {
                                setSelectedAbility(null);
                                return;
                            }    
                            setSelectedAbility(ability);
                        }}
                        style={selectedAbility == ability ? 
                            {
                                filter: "drop-shadow(0 0 0.5rem var(--blue-2))",
                                border: "2px solid var(--blue-2)"
                            } : 
                            {}}
                    >
                        <img className="ability-icon" src={ability.icon} alt={ability.name} />
                    </button>
                ))}
            </div>
        </div>
    )

}