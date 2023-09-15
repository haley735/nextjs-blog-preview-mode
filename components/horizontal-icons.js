import Link from "next/link";
import React from "react";
import Avatar from "./avatar";
import ContentfulImage from './contentful-image'

export default function HorizontalIcons({ icons }) {
  const imagePlacement = icons[0].horizontalIcons.photoLocation;
  const image = icons[0].horizontalIcons.photo?.url;
  const title = icons[0].horizontalIcons.title;
  const displayTitle = icons[0].horizontalIcons.displayTitle;
  const iconsList = icons[0].horizontalIcons.iconsCollection.items;

  return (
      <>
      <div className="container w-full h-max mx-auto p-5">
        {displayTitle && 
          <h3 className="text-6xl md:text-4xl font-gotham-bold text-teal tracking-widest leading-tight md:pr-8">
            {title.toUpperCase()}
          </h3>
         }
          <>
          {imagePlacement && imagePlacement == 'Top' && image &&
            <div className="relative w-full h-48">
              <ContentfulImage 
                src={image}
                layout="fill"
                className=""
                alt={title}
                sizes='100vw'
              />
            </div>
          }
            <div className="flex flex-row md:flex-col justify-between items-start mb-4 mx-12">
              {iconsList.map((icon, index) => {
                return (
                  <React.Fragment key={'iconGroup-' + index}>
                      <div className="flex flex-col justify-between items-center">
                        <div className="relative rounded-full w-60 h-60 mb-5">
                          <ContentfulImage 
                            src={icon.iconImage.url}
                            layout="fill"
                            className="rounded-full -z-10"
                            alt={icon.title}
                          />
                        </div>
                        <div className="flex flex-row justify-between items-center mb-4">
                          <div className="w-64 h-16">
                            <h3 className="text-center text-3xl text-black font-gotham-light mt-5">{icon.title}</h3>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between items-center mb-4">
                          <div className="w-64">
                            <p className="text-center text-black text-justify font-gotham-book text-md mt-8 md:pl-8">
                              {icon.body}  
                            </p> 
                          </div>
                        </div>
                      </div>

                  </React.Fragment>
                );
              })
              }  
            </div>
            {imagePlacement && imagePlacement == 'Bottom' && image &&
              <div className="relative w-full h-48">
                <ContentfulImage 
                  src={image}
                  layout="fill"
                  className=""
                  alt={title}
                  sizes='100vw'
                />
              </div>
            }
          </>       
      </div>
    </>
      
  )
}