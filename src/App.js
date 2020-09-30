import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import apiKeys from './env'
import DepTable from './DepTable'
import moment from 'moment';

function App() {

  // API Proxy to prevent CORS error
  const Proxy = 'https://cors-anywhere.herokuapp.com/'
  //const Proxy = 'https://thingproxy.freeboard.io/fetch/'
  // Station ID of Dornbusch / refer to RMV API documentation for different station
  const stationID_dornbusch = '3001301'
  const stationID_hauptfriedhof= '3001401'

  const [Time, setTime] = useState(moment().format('HH:mm'))

  // State variables for different subway lines. n = northbound / s = southbound
  // Direction of the trains

  // Dornbusch subway station
  const [u1n, setU1n] = useState([])
  const u1n_dir = "Frankfurt (Main) Ginnheim"
  const colU1 = "#a93634"

  const [u2n, setU2n] = useState([])
  const u2n_dir = "Bad Homburg v.d.H.-Gonzenheim (U)"
  const colU2 = "#49a258"

  const [u3n, setU3n] = useState([])
  const u3n_dir = "Oberursel (Taunus)-Hohemark"
  const colU3 = "#4d5ea4"

  const [u8n, setU8n] = useState([])
  const u8n_dir = "Frankfurt (Main) Riedberg"
  const colU8 = "#bd81b1"

  const [u1238s, setU1238s] = useState([])
  const u1238s_dir = "Frankfurt (Main) Südbahnhof"

  // Hauptfriedhof subway station
  const [u5n, setU5n] = useState([])
  const [u5s, setU5s] = useState([])
  const u5n_dir = "Frankfurt (Main) Preungesheim"
  const u5s_dir = "Frankfurt (Main) Hauptbahnhof"
  const colU5 = "#347647"

  // Dornbusch bus station
  const [b34w, setB34w] = useState([])
  const [b34e, setB34e] = useState([])
  const b34e_dir = "Frankfurt (Main) Bornheim Mitte"
  const b34w_dir = "Frankfurt (Main) Mönchhofstraße"
  const colB34 = "#49a38d"

  useEffect(() => {

    //console.log(Proxy + 'https://www.rmv.de/hapi/departureBoard?accessId='+ apiKeys.rmvApiKey +'&id='+ stationID +'&format=json')
    

    // run once, then every x seconds
    axios.get(Proxy + 'https://www.rmv.de/hapi/departureBoard?accessId='+ apiKeys.rmvApiKey +'&id='+ stationID_dornbusch +'&format=json')
       .then(response => update(response.data.Departure))

    axios.get(Proxy + 'https://www.rmv.de/hapi/departureBoard?accessId='+ apiKeys.rmvApiKey +'&id='+ stationID_hauptfriedhof +'&format=json')
       .then(response => update_Hauptfriedhof(response.data.Departure))

    const interval = setInterval(() => {
      
      setTime(moment().format('HH:mm'))


        axios.get(Proxy + 'https://www.rmv.de/hapi/departureBoard?accessId='+ apiKeys.rmvApiKey +'&id='+ stationID_dornbusch +'&format=json')
        .then(response => update(response.data.Departure))

        axios.get(Proxy + 'https://www.rmv.de/hapi/departureBoard?accessId='+ apiKeys.rmvApiKey +'&id='+ stationID_hauptfriedhof +'&format=json')
        .then(response => update_Hauptfriedhof(response.data.Departure))

    }, 20000); 
    
        

        
}, []);



const update = (data) => {
    
  //setDepartData(data)

  //console.log(data)
  console.log('update Dornbusch')

  setU1238s(data.filter(function(d) { return (d.direction === u1238s_dir) }))

  setU1n(data.filter(function(d) { return (d.Product.line === 'U1' && d.direction === u1n_dir) }))

  setU2n(data.filter(function(d) { return (d.Product.line === 'U2' && d.direction === u2n_dir) }))

  setU3n(data.filter(function(d) { return (d.Product.line === 'U3' && d.direction === u3n_dir) }))

  setU8n(data.filter(function(d) { return (d.Product.line === 'U8' && d.direction === u8n_dir) }))

  setB34e(data.filter(function(d) { return (d.Product.line === '34' && d.direction === b34e_dir) }))
  setB34w(data.filter(function(d) { return (d.Product.line === '34' && d.direction === b34w_dir) }))

}

const update_Hauptfriedhof = (data) => {

  //console.log(data)

  console.log('update Hauptfriedhof')

  setU5n(data.filter(function(d) { return (d.Product.line === 'U5' && d.direction === u5n_dir) }))
  setU5s(data.filter(function(d) { return (d.Product.line === 'U5' && d.direction === u5s_dir) }))

}


  return (
    <div className="App">
      <header className="App-header">

        <div className="Time">
          {Time}
        </div>

        <div className="Tables">
          <DepTable Title={'Südbahnhof'} Data={u1238s} key={'1'}/>
          <DepTable Title={'Ginnheim'} Data={u1n} Color={colU1} key={'2'}/>
          <DepTable Title={'Gonzenheim'} Data={u2n} Color={colU2} key={'3'}/>
          <DepTable Title={'Hohe Mark'} Data={u3n} Color={colU3} key={'4'}/>
          <DepTable Title={'Riedberg'} Data={u8n} Color={colU8} key={'5'}/>
        </div>
        <div className="Tables">     
          <DepTable Title={'Rödelheim'} Data={b34w} Color={colB34} key={'6'}/>
          <DepTable Title={'Bornheim'} Data={b34e} Color={colB34} key={'7'}/>
          <DepTable Title={'Hauptbahnhof'} Data={u5s} Color={colU5} key={'8'}/>
          <DepTable Title={'Preungesheim'} Data={u5n} Color={colU5} key={'9'}/>
        </div>

        
          

      </header>

      
    </div>
  );
}

export default App;
