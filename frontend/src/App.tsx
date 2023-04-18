import { useLayoutEffect, useState } from 'react'
import './App.css'
import ChampField from './components/field/ChampField'
import FunctionPanel from './components/functionPanel/FunctionPanel'
import MovementAnchor, { AnchorTypes } from './components/movement/MovementAnchor'
import { Champion } from './ts/types'
import { championFilters } from './ts/filters'

function App() {
  const [center, setCenter] = useState({ x: 0, y: 0 }); // in pixels
  const [mouse, setMouse] = useState({ x: 0, y: 0 }); // in pixels
  const [fieldRadius, setFieldRadius] = useState(0); // in pixels
  const [searchTerm, setSearchTerm] = useState("v"); // in pixels
  const [championFilter, setChampionFilter] = useState(championFilters[0]);

  console.log(championFilter)

  useLayoutEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setCenter({ x: innerWidth / 2, y: innerHeight / 2 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App" onMouseMove={e => setMouse({x: e.clientX, y: e.clientY})}>
      <FunctionPanel setSearchTerm={setSearchTerm} setFilterType={setChampionFilter} />
      <MovementAnchor center={center} mouse={mouse} type={AnchorTypes.Movement} />
      <ChampField center={center} mouse={mouse} filterOn={championFilter} searchTerm={searchTerm}/>
      <img className="background" loading="lazy" src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/lcu-article-backdrop.jpg" alt="background" />
    </div>
  )
}

export default App
