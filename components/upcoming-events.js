import React from 'react';

export default function UpcomingEvents({ events }) {
  const eventList = events.events.eventsCollection.items;

  function formatDateAndTime(field1, field2){
    const date = new Date(field1);
    const date2 = new Date(field2);
    let formattedDate = date.toDateString();
    const dateArr = formattedDate.split(' ');
    const [weekday, month, day] = [...dateArr];
    let formattedStartTime = date.toLocaleTimeString('en-US', {'timeStyle': 'short'});
    let formattedEndTime = date2.toLocaleTimeString('en-US', {'timeStyle': 'short'});
    return [month.toUpperCase(), day, formattedStartTime, formattedEndTime];
  }

  return (
  <>
  {/* for adding an image and then overlaying a color on top of it, have the image url in tailwind config and then put:  bg-crimson bg-blend-overlay */}
  <div className='bg-event-banner  w-full'>
    <h3 className="text-white font-gotham-black text-5xl"> Upcoming Events</h3>
    <div className="flex flex-wrap">
      <div className="flex flex-row w-max">
          {eventList &&
            eventList.map((event, index) => {
              const [month, day, startTime, endTime] = formatDateAndTime(event.eventStartDate, event.eventEndDate);
              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col w-max h-80 items-center">

                    <h3 key={'month-' + index} className="flex text-white font-gotham-medium text-xl text-center mb-0">
                      {month}
                    </h3>
                    <h4 className='flex text-white font-clarendon text-6xl text-center mt-0'>
                      {day}
                    </h4>
                  </div>
                  <div className="flex flex-col">
                     <h2 className="text-white font-gotham-medium text-lg w-max">{event.eventName}</h2>
                     <div className="flex flex-row">
                       <svg
                         width="24"
                         height="24"
                         xmlns="http://www.w3.org/2000/svg"
                         stroke="white">
                         <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
                       </svg>

                       <p className="text-white text-sm font-gotham-light">{event.eventLocationName}</p>
                     </div>
                     <div className="flex flex-row">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         x="0px"
                         y="0px"
                         width="24"
                         height="24"
                         viewBox="0,0,256,256"
                         fill="#000000">
                         <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"><g transform="scale(10.66667,10.66667)"><path d="M12,2c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c5.511,0 10,-4.489 10,-10c0,-5.511 -4.489,-10 -10,-10zM12,4c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8zM11,6v6.41406l4.29297,4.29297l1.41406,-1.41406l-3.70703,-3.70703v-5.58594z"></path></g></g>
                       </svg>

                       <p className="text-white text-sm font-gotham-light">{startTime} - {endTime}</p>

                     </div>
                   </div>
                   {index != 2 && <div className="inline-block h-16 min-h-[1em] w-0.5 self-stretch bg-white opacity-100 "></div>}
                   
                  </React.Fragment>
              );
            })
          }
      </div>
      

    </div>
    
  </div>
  
  
    {/* <iframe 
      width="500" 
      height="300" 
      frameBorder="0" 
      scrolling="no" 
      marginHeight="0" 
      marginWidth="0" 
      src="https://maps.google.com/maps?q='+YOUR_LAT+','+YOUR_LON+'&hl=es&z=14&amp;output=embed"
    >
  </iframe> */}
  <br />
  {/* <small>
    <a 
      href="https://maps.google.com/maps?q='+data.lat+','+data.lon+'&hl=es;z=14&amp;output=embed" 
      style="color:#0000FF;text-align:left" 
      target="_blank"
    >
      See map bigger
    </a>
 </small> */}
  </>
  );
}