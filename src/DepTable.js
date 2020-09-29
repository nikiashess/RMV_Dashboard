import React from 'react'
import './App.css';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';


export default function DepTable({ Title, Data, Color}) {

  const TableContainer = {
    width: 160, 
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderRadius: 10,
    border: "3px solid " + (Color == undefined ? '#a93634' : Color),
    margin: 10,
  }

  const HeaderContainer = {
    backgroundColor: Color == undefined ? '#a93634' : Color,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  }
  const BodyContainer = {
    padding: 10,
    textAlign: 'left',
  }
  const TextContainer = {
    flexDirection: 'row',
  }
  const Text1 = {
    fontWeight: 'bold',
    fontSize: 12,
  }
  const Text2 = {
    fontSize: 10,
  }
  const Text3 = {
    fontSize: 10,
    color: Color == undefined ? '#a93634' : Color
  }

  return (
      
    <div style={TableContainer}>
        <div style={HeaderContainer}>
            {Title}
        </div>
        <div>

        <div style={BodyContainer}>
          {Data == undefined ? null : Data.slice(0,6).map(element => {

                      return(

                            element.rtTime == undefined ? null : 
                            <div key={element.index}>
                                <span style={Text1}>
                                    {'in ' + moment(element.rtTime, 'HH:mm:ss').diff(moment(), 'minutes') + ' Minuten'}
                                </span>

                                <div style={TextContainer}>

                                    <span style={Text2}>
                                        {element.rtTime}
                                    </span>

                                    <span style={Text3}>
                                        {element.time == element.rtTime ? '' : (' +' + moment(element.rtTime, 'HH:mm:ss').diff(moment(element.time, 'HH:mm:ss'), 'minutes'))}
                                    </span>
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

