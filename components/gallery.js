import ContentfulImage from "./contentful-image";
import { Gallery } from "react-grid-gallery";
import Divider from "./divider";

export default function MediaGallery({ images }) {
  const imageList = images[0].photosCollection.items;
  const newImageList = [];
  imageList.forEach((image) => {
    const newImage = {
      src: image.url,
      contentType: image.contentType,
      description: image.description,
      height: image.height,
      width: image.width,
      alt: image.title,
      customOverlay: (
        <div className="bg-crimson">
          <div className="text-white font-gotham-light">Testing</div>
        </div>
      ),
    };
    newImageList.push(newImage);
    // console.log(newImage);
  })
 
  const title = images[0].title;

  return(
    <>
      <div className="z-50 mb-8">
        <Divider options={{marginBottom: false}}></Divider>
      </div>
        <div className='container w-full h-fit bg-lightergrey relative -z-10 -mt-12'>
          <div className="mx-12"><br></br> <br></br> <br></br></div>
          <h3 className="text-crimson text-center text-6xl font-gotham-medium tracking-widest">
            {title.toUpperCase()}
          </h3>
          <Gallery margin={10} images={newImageList} />

        </div>        
    </>
  )
}
