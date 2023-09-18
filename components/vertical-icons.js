import Link from "next/link";
import React from "react";
import ContentfulImage from './contentful-image'

export default function VerticalIcons({ icons }) {
  const imagePlacement = icons[0].verticalIcons.photoLocation;
  const image = icons[0].verticalIcons.photo?.url;
  const title = icons[0].verticalIcons.title;
  const displayTitle = icons[0].verticalIcons.displayTitle;
  const iconsList = icons[0].verticalIcons.iconsCollection.items;
  return (
      <>
      <div className="container w-full h-max mx-auto p-5">
        {displayTitle && 
          <h3 className="text-center text-6xl md:text-4xl font-gotham-bold text-teal tracking-widest leading-tight md:pr-8">
            {title.toUpperCase()}
          </h3>
        }
        <div className="flex flex-row md:flex-col jutify-between h-fit w-fit mx-8 items-center">
          {imagePlacement && imagePlacement == 'Left' && image && 
            <div className="relative w-2/4 h-96 mx-4">
              <ContentfulImage 
                src={image}
                layout="fill"
                className="-z-10"
                alt={title}
                sizes='100vw'
              />
            </div>
          }
          <div className="flex flex-col w-3/4 pr-4 items-start mb-4">
            {iconsList && iconsList.map((icon, index) => {
                return (
                  <React.Fragment key={'iconGroup-' + index}>
                      <div className="flex flex-row md:flex-col w-full ml-12 items-center mb-8">
                        <div className="relative rounded-full w-48 h-48">
                          <ContentfulImage 
                            src={icon.iconImage.url}
                            layout="fill"
                            className="rounded-full -z-10"
                            alt={icon.title}
                          />
                        </div>
                        <div className="flex flex-col w-3/4 justify-between items-left p-4">
                          <div className="w-48 h-16 mb-0 p-4">
                            <h3 className="text-left text-3xl text-black font-gotham-medium mt-5">{icon.title}</h3>
                          </div>
                          <div className="w-full p-2">
                            <p className="text-left text-black font-gotham-book text-md hyphens-auto">
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
         {imagePlacement && imagePlacement == 'Right' && image && 
            <div className="relative w-2/4 h-96 mx-4">
              <ContentfulImage 
                src={image}
                layout="fill"
                className="-z-10"
                alt={title}
                sizes='100vw'
              />
            </div>
              
            }
        </div>
      </div>
      </>
      
  )
}