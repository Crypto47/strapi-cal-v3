import React, { useState,useEffect,useScript } from "react";
import { Calendar } from "react-multi-date-picker"
import transition from "react-element-popper/animations/transition"
import "react-multi-date-picker/styles/layouts/prime.css"
import axios from 'axios'
// import { Box } from '@strapi/design-system/Box';
// import { Typography } from "@strapi/design-system/Typography";


export default function Example() {

  var gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID = ""
  var API_KEY = ""
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': 'Awesome Event!',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'Really great refreshments',
          'start': {
            'dateTime': '2020-06-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2020-06-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

        /*
            Uncomment the following block to get events
        */
        
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 5,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        
    

      })
    })
  }













  const [value, setValue] = useState(new Date());
  function tot(){
    console.log("hello")
  }
  const style = {
    display: "inline-block",
    width: "90px",
    fontSize: "16px",
  };
  useEffect(()=>{
    //call your increment function here
    console.log(value.toDate?.().toString())
},[value]) 
return (
  <>





    {/* <Typography variant="alpha" as="h1">
      Welcome to the Strapi Calendar Plugin{" "}
      <span aria-label="wave emoji" role="img">
        👋
      </span>
    </Typography> */}

    <Calendar
    animations={[transition()]} 
    onClick
    calendarPosition="bottom-center"
      fullYear
      value={value}
      onChange={setValue}
    />
    {/* <Box
      as="aside"
      aria-labelledby="additional-informations"
      background="neutral0"
      borderColor="neutral150"
      hasRadius
      paddingBottom={4}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={6}
      shadow="tableShadow"
    >
    </Box> */
    
    <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
  }




    
  </>
  
)

}