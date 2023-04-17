import { useLayoutEffect, useState } from 'react'
import './App.css'
import ChampField from './components/field/ChampField'
import FunctionPanel from './components/functionPanel/FunctionPanel'
import MovementAnchor, { AnchorTypes } from './components/movement/MovementAnchor'
import SVGStyles from './components/svgStyles/SVGStyles'

function App() {
  const [center, setCenter] = useState({ x: 0, y: 0 }); // in pixels
  const [mouse, setMouse] = useState({ x: 0, y: 0 }); // in pixels
  const [fieldRadius, setFieldRadius] = useState(0); // in pixels

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
      <SVGStyles />
      <FunctionPanel />
      <MovementAnchor center={center} mouse={mouse} type={AnchorTypes.Movement} />
      <ChampField center={center} mouse={mouse} setRadius={setFieldRadius}/>
      <img className="background" loading="lazy" src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/lcu-article-backdrop.jpg" alt="background" />
    </div>
  )
}

export default App
