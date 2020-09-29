import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import apiKeys from './env'
import DepTable from './DepTable'
import moment from 'moment';

function App() {

  // API Proxy to prevent CORS error
  const Proxy = 'https://cors-anywhere.herokuapp.com/'
  // Station ID of Dornbusch / refer to RMV API documentation for different station
  const stationID_dornbusch = '3001301'
  const stationID_hauptfriedhof= '3001401'

  const [Time, setTime] = useState(moment().format('HH:mm'))

  // State variables for different subway lines. n = northbound / s = southbound
  // Direction of the trains

  // Dornbusch subway station
  const [u1n, setU1n] = useState([])
  const [u1s, setU1s] = useState([])
  const u1n_dir = "Frankfurt (Main) Ginnheim"
  const u1s_dir = "Frankfurt (Main) Südbahnhof"
  const colU1 = "#a93634"

  const [u2n, setU2n] = useState([])
  const [u2s, setU2s] = useState([])
  const u2n_dir = "Bad Homburg v.d.H.-Gonzenheim (U)"
  const u2s_dir = "Frankfurt (Main) Südbahnhof"
  const colU2 = "#49a258"

  const [u3n, setU3n] = useState([])
  const [u3s, setU3s] = useState([])
  const u3n_dir = "Oberursel (Taunus)-Hohemark"
  const u3s_dir = "Frankfurt (Main) Südbahnhof"
  const colU3 = "#4d5ea4"

  const [u8n, setU8n] = useState([])
  const [u8s, setU8s] = useState([])
  const u8n_dir = "Frankfurt (Main) Riedberg"
  const u8s_dir = "Frankfurt (Main) Südbahnhof"
  const colU8 = "#bd81b1"

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

    //axios.get(Proxy + 'https://www.rmv.de/hapi/departureBoard?accessId='+ apiKeys.rmvApiKey +'&id='+ stationID_hauptfriedhof +'&format=json')
       //.then(response => update_Hauptfriedhof(response.data.Departure))

    const interval = setInterval(() => {
        axios.get(Proxy + 'https://www.rmv.de/hapi/departureBoard?accessId='+ apiKeys.rmvApiKey +'&id='+ stationID_dornbusch +'&format=json')
       .then(response => update(response.data.Departure))

       //axios.get(Proxy + 'https://www.rmv.de/hapi/departureBoard?accessId='+ apiKeys.rmvApiKey +'&id='+ stationID_hauptfriedhof +'&format=json')
       //.then(response => update_Hauptfriedhof(response.data.Departure))
    
      setTime(moment().format('HH:mm'))
       
    }, 30000); 
    
        

        
}, []);



const update = (data) => {
    
  //setDepartData(data)

  //console.log(data)
  console.log('update')

  setU1n(data.filter(function(d) { return (d.Product.line === 'U1' && d.direction === u1n_dir) }))
  setU1s(data.filter(function(d) { return (d.Product.line === 'U1' && d.direction === u1s_dir) }))

  setU2n(data.filter(function(d) { return (d.Product.line === 'U2' && d.direction === u2n_dir) }))
  setU2s(data.filter(function(d) { return (d.Product.line === 'U2' && d.direction === u2s_dir) }))

  setU3n(data.filter(function(d) { return (d.Product.line === 'U3' && d.direction === u3n_dir) }))
  setU3s(data.filter(function(d) { return (d.Product.line === 'U3' && d.direction === u3s_dir) }))

  setU8n(data.filter(function(d) { return (d.Product.line === 'U8' && d.direction === u8n_dir) }))
  setU8s(data.filter(function(d) { return (d.Product.line === 'U8' && d.direction === u8s_dir) }))

  setB34e(data.filter(function(d) { return (d.Product.line === '34' && d.direction === b34e_dir) }))
  setB34w(data.filter(function(d) { return (d.Product.line === '34' && d.direction === b34w_dir) }))

}

const update_Hauptfriedhof = (data) => {

  //console.log(data)

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
          <DepTable Title={'U1 Südbahnhof'} Data={u1s} Color={colU1} key={'1'}/>
          <DepTable Title={'U2 Südbahnhof'} Data={u2s} Color={colU2} key={'2'}/>
          <DepTable Title={'U3 Südbahnhof'} Data={u3s} Color={colU3} key={'3'}/>
          <DepTable Title={'U8 Südbahnhof'} Data={u8s} Color={colU8} key={'4'}/>
          <DepTable Title={'34 Rödelheim'} Data={b34w} Color={colB34} key={'5'}/>
          <DepTable Title={'U5 Hauptbahnhof'} Data={u5s} Color={colU5} key={'11'}/>
        </div>
        <div className="Tables">
          <DepTable Title={'U1 Ginnheim'} Data={u1n} Color={colU1} key={'6'}/>
          <DepTable Title={'U2 Gonzenheim'} Data={u2n} Color={colU2} key={'7'}/>
          <DepTable Title={'U3 Hohe Mark'} Data={u3n} Color={colU3} key={'8'}/>
          <DepTable Title={'U8 Riedberg'} Data={u8n} Color={colU8} key={'9'}/>
          <DepTable Title={'34 Bornheim'} Data={b34e} Color={colB34} key={'10'}/>
          <DepTable Title={'U5 Preungesheim'} Data={u5n} Color={colU5} key={'12'}/>
        </div>

        
          

      </header>
    </div>
  );
}

export default App;
