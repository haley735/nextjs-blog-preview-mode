export default function UpcomingEvents({ events }) {
  const eventList = events.events.eventsCollection.items;
  const event1 = eventList[0];
  let event1Date = event1.eventStartDate;
  console.log(event1);

  function formatDateAndTime(field){
    const date = new Date(field);
    let formattedDate = date.toDateString();
    const dateArr = formattedDate.split(' ');
    const [weekday, month, day] = [...dateArr];
    let formattedTime = date.toLocaleTimeString('en-US', {'timeStyle': 'short'});
    console.log(month);
    console.log(weekday);
    console.log(day);
    console.log(formattedTime);
    return [month, day, formattedTime];
  }

  const [month, day, time] = formatDateAndTime(event1Date);

  return (
  <>
  <div className='bg-crimson w-full'>
    <div className="flex flex-col w-full h-52">
      <h3 className="flex text-white font-clarendon">
        {month}
      </h3>
      <h4 className='flex text-white font-gotham-black'>
        {day}
      </h4>
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