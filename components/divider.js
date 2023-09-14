export default function Divider({options}) {
  console.log('divider options: ', options.marginBottom);
  const marginOptions = (options.marginBottom ? ' my-12' : ' mt-12');
  const moveUp = (!options.marginBottom ? ' -mb-2 z-20' : '');
  // console.log('margin options: ', marginBottom);
  
  return(
    <hr className={`mx-96 h-7 border-t-0 rounded-full bg-crimson opacity-100 ${marginOptions} ${moveUp}`}/> 
  )
}
