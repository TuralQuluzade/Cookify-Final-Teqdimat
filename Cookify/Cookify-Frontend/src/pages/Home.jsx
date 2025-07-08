import React from 'react'
import Sect1 from "../sections/home-Sections/sect1/Sect1.jsx";
import Sect2 from "../sections/home-Sections/sect2/Sect2.jsx";
import Sect3 from "../sections/home-Sections/sect3/Sect3.jsx";
import Sect4 from "../sections/home-Sections/sect4/Sect4.jsx";


const Home = () => {
  return (
    <div>
      <Sect1/>
        <Sect3/>
        <Sect4/>
        <Sect2/>

    </div>
  )
}

export default Home