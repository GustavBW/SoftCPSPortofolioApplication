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
            //console.table(selectedAbility.description);
            return (
                <div className="ability-description">
                    {selectedAbility.description.map((line, index) => {
                        return (
                            <p className="ability-description-line" key={index}>{line}</p>
                        );
                    })}
                </div>
            );
        }else{
            return (
                <>
                    <p className="ability-description">Select an ability to see more information</p>
                </>
            );
        }
    }

    const getAbilityTitle = () => {
        if(selectedAbility === null || selectedAbility === undefined) return (<></>);
        console.log(selectedAbility.cost);
        return (
            <>
                <h1>{selectedAbility.name}</h1>
                {selectedAbility.cost.map((cost, index) => {
                    <h1 className="ability-cost" key={index}>{cost}</h1> 
                })}
                
            </>
        );
    }


    return (
        <div className="ChampionAbilityView">
            <div className="ability-title"> {selectedAbility != null ? 
                getAbilityTitle()
                : 
                <h1>Abilities</h1>
            } </div>

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