import Link from 'next/link';
import { Gallery } from "react-grid-gallery";
import Divider from "./divider";
import ContentfulImage from './contentful-image';

export default function MediaGallery({ images }) {
  const imageList = images[0].photosCollection.items;
  const newImageList = [];

  const handleHover = (event) => {
    const reveal = document.getElementById('hover-reveal');
    reveal.style.setProperty('transition', 'fadeIn 5s ease-in-out 5s');
    reveal.style.display = 'block';
  }

  const handleHoverRemove = (event) => {
    const reveal = document.getElementById('hover-reveal');
    reveal.style.display = 'none';
  }

  imageList.forEach((image) => {
    const newImage = {
      src: image.url,
      contentType: image.contentType,
      description: image.description,
      height: image.height,
      width: image.width,
      alt: image.title,
      caption: image.title,
      customOverlay: (
        <div className="none transition-opacity duration-500 ease-in opacity-0 hover:opacity-100 hover:block bg-crimson w-24 h-24">
          <p>Testing</p>
          <div className="custom-overlay text-white font-gotham-light">Testing</div>
        </div>
      )
    };
    console.log('aspect ratio: ', image.width/image.height);
    newImageList.push(newImage);
    // console.log(newImage);
  })

  /**
   * 
   * .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      grid-gap: 10px;
    }

    @media screen and (max-width: 767px) {
      .gallery {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-gap: 5px;
      }
    }

    .gallery__item {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.2s ease-in-out;
    }

    .gallery__item:hover {
      transform: scale(1.05);
    }
   */
 
  const title = images[0].title;
  console.log(newImageList);



  const customOverlay = (
    <div onMouseEnter={handleHover} className="bg-crimson w-24 h-24">
      <p>Testing</p>
      <div className="text-white font-gotham-light">Testing</div>
    </div>
  );
  return(
    <>
      <div className="z-50 mb-8">
        <Divider options={{marginBottom: false}}></Divider>
      </div>
      {/* <div onMouseEnter={handleHover} onMouseLeave={handleHoverRemove} className="bg-crimson w-24 h-24"> */}
        {/* <div id="hover-reveal" className="none transition-opacity duration-500 ease-in opacity-0 hover:opacity-100 hover:block bg-crimson w-24 h-24">
          
          <button className="block justify-center">
            <Link className="items-center" href='/'>
              <svg 
                width="48" 
                height="48" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="white"
                fillRule="evenodd" 
                clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
            </Link>
          </button>
        </div> */}

        <div className="relative ">
          <div className="absolute inset-0 z-10 bg-crimson text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
            <button className="block justify-center">
                <Link className="items-center" href='/'>
                  <svg 
                    width="48" 
                    height="48" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="white"
                    fillRule="evenodd" 
                    clipRule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
                </Link>
              </button>
          </div>
          <div className="relative">
            <div className="h-48 flex flex-wrap content-center">
                <ContentfulImage src={newImageList[0].src} layout="fill" className="mx-auto" alt="" />
            </div>
          </div>
        </div>


        <div className='container w-full h-fit bg-lightergrey relative -z-10 -mt-12'>
          <div className="mx-12"><br></br> <br></br> <br></br></div>
          <h3 className="text-crimson text-center text-6xl font-gotham-medium tracking-widest">
            {title.toUpperCase()}
          </h3>
          <Gallery margin={10} images={newImageList} enableImageSelection={false}/>

        </div>        
    </>
  )
}
