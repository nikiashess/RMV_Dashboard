import React from 'react'
import './App.css';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';


export default function DepTable({ Title, Data, Color}) {

  const colU1 = "#a93634"
  const colU2 = "#49a258"
  const colU3 = "#4d5ea4"
  const colU8 = "#bd81b1"
  const colU5 = "#347647"
  const colRMV = "#49a38d"

  const TableContainer = {
    width: 130, 
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderRadius: 10,
    border: "3px solid " + (Color === undefined ? colRMV : Color),
    margin: 10,
  }

  const HeaderContainer = {
    backgroundColor: Color === undefined ? colRMV : Color,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  }
  const BodyContainer = {
    padding: 10,
    textAlign: 'left',
  }
  const TextContainer = {
    flexDirection: 'row',
    marginBottom: 3,
    marginTop: 2,
  }
  const Text1 = {
    fontWeight: 'bold',
    fontSize: 10,
  }
  const Text2 = {
    fontSize: 10,
  }
  const Text3 = {
    fontSize: 10,
    color: '#ff0000',
  }

  const ubahnIcon = (color, line) => (
    <span style={{
      backgroundColor: color,
      borderRadius: 2,
      padding: 2,
      fontWeight: 'bold',
      fontSize: 12,}}>
    {line}
  </span>
  )

  const depTag = (time, rtTime) => (
    
    <label>

      <span style={Text1}>
        {' in ' + moment(rtTime, 'HH:mm:ss').diff(moment(), 'minutes') + ' Minuten'}
      </span>
      <br />
      <span style={Text2}>
          {"" + rtTime}
      </span>
      <span style={Text3}>
          {time === rtTime ? '' : (' +' + moment(rtTime, 'HH:mm:ss').diff(moment(time, 'HH:mm:ss'), 'minutes'))}
      </span>

      
    </label>

  )

  

  const chooseColor = (line) => {
    switch(line) {
      case 'U1':
        return colU1;
      case 'U2':
        return colU2;
      case 'U3':
        return colU3;
      case 'U5':
        return colU5;
      case 'U8':
        return colU8;
      default:
        return colRMV;
    }
  }

  return (
      
    <div style={TableContainer}>
        <div style={HeaderContainer}>
            {Title}
        </div>
        <div>

        <div style={BodyContainer}>
          {Data === undefined ? null : Data.slice(0,5).map(element => {
                      

                      return(

                            element.rtTime === undefined ? null : 
                            <div key={element.JourneyDetailRef.ref}>
                                <div style={TextContainer}>
                                    {ubahnIcon(chooseColor(element.Product.line), element.Product.line)}
                                    {depTag(element.time, element.rtTime)}
                                </div>

                                <Divider/>
                                
                            </div>
                          
                      )
                    })}
        </div>

        </div>
    </div>
  )
}

