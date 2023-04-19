import { useLayoutEffect, useState } from 'react'
import './App.css'
import ChampField from './components/field/ChampField'
import FunctionPanel from './components/functionPanel/FunctionPanel'
import MovementAnchor, { AnchorTypes } from './components/movement/MovementAnchor'
import { Champion } from './ts/types'
import { championFilters } from './ts/filters'
import HealthMonitor from './components/healthMonitor/HealthMonitor'

function App() {
  const [center, setCenter] = useState({ x: 0, y: 0 }); // in pixels
  const [mouse, setMouse] = useState({ x: 0, y: 0 }); // in pixels
  const [fieldRadius, setFieldRadius] = useState(0); // in pixels
  const [searchTerm, setSearchTerm] = useState("v"); // from function panel > menu into ChampField
  const [championFilter, setChampionFilter] = useState(championFilters[0]); //Champion attribute filter function
  const [anchorType, setAnchorType] = useState(AnchorTypes.Movement); //Champion attribute filter function
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null); //Champion attribute filter function

  //Due to the heavy use of SVG elements, which does not scale as regular DOM elements, 
  //"center" is used to make sure the scaling is accurate.
  useLayoutEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setCenter({ x: innerWidth / 2, y: innerHeight / 2 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    //Used on Component.unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App" onMouseMove={e => setMouse({x: e.clientX, y: e.clientY})}>
      <HealthMonitor setAnchorType={setAnchorType}/>
      <FunctionPanel setSearchTerm={setSearchTerm} setFilterType={setChampionFilter} setAnchorType={setAnchorType}/>
      <MovementAnchor center={center} mouse={mouse} type={anchorType} />
      <ChampField setSelectedChampion={setSelectedChampion} center={center} mouse={mouse} filterOn={championFilter} searchTerm={searchTerm} setAnchorType={setAnchorType} />
      <img className="background" loading="lazy" src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/lcu-article-backdrop.jpg" alt="background" />
    </div>
  )
}

export default App
