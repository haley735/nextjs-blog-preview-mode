import Link from 'next/link';
import React, { StrictMode } from 'react';
import { useState } from 'react';

/**
 * 
 * For creating a dropdown option in the navigation: 
 * need a wrapping div w/className="relative-group"
 * main nav option with drop down needs to be a button 
 * dropdown div needs to be hidden with group-hover:block
 * 
 */

export default function Header({pages, subpages, headerMedia}) {
  const logo = headerMedia && headerMedia[0]?.logo?.url;
  const headerImg = headerMedia && headerMedia[0]?.headerImg?.url;
  const headerVideo = headerMedia && headerMedia[0]?.headerVideo?.url;
  // TODO: fix subpages being matched up to correct page
  return (
    <>
    <nav aria-label="primary" className="bg-crimson sticky w-full top-0 left-0">
      <div className="max-w-screen-xl flex flex-row items-center mx-auto p-4">
        <a href="/" className="flex items-center ">
          <img src={logo && logo} className="h-24 w-48 mr-6 ml-28" alt="Alumni Logo"></img>
        </a>
        <div className="flex order-2">
            <button type="button" className="ml-4 mr-14 text-crimson bg-white hover:bg-lightgrey focus:ring-4 focus:outline-none focus:ring-blue-300 font-gotham-light rounded-lg text-md px-4 py-2 text-center ">Give Back</button>
        </div>
        <div className="flex flex-col items-center h-24 justify-between w-auto md:flex md:w-auto order-1" id="navbar-sticky">  
        {/* id="navbar-sticky"> */}
          <ul className="flex py-8 md:p-0 font-medium md:flex-row md:space-x-8 md:mt-0">
            {pages && pages.map((page, index) => {
                return (
                <React.Fragment key={'menu-item-' + index}>
                  <div key={'relative-group-' + index} className="relative group">
                  <button key={'page-'+ page.title + '-' + index} className="block lg:inline-block lg:mt-0 text-white font-gotham-light hover:text-lightgrey ml-2 mr-4"><Link href={'/' + page.slug}>{page.title}</Link></button>
                  {subpages && subpages.length > 0 && (
                    <div key={'submenu-' + page.title + '-' + index} className="z-10 hidden bg-white rounded-lg shadow w-44 group-hover:block"> 
                      {subpages.map((subpage, index) => {
                        return (
                          <>
                            <div key={'dropdown-' + subpage.title + '-' + index} className="px-2 pt-2 pb-4 shadow-lg">
                              <Link key={'subpage-' + subpage.tite + '-' + index} href={'/' + subpage.slug} className="block mt-4 lg:inline-block lg:mt-0 text-crimson font-gotham-light hover:text-black mr-4">{subpage.title}</Link>
                            </div>
                          </>
                          
                          );
                        })}

                      </div>
                  )}
                  </div> 
                </React.Fragment>
                );
              })}
          </ul>
        </div>
      </div>
      {/* work on divider line */}
      {/* <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" /> */}
    </nav>
    <div className='container mx-auto bg-criimson'>
      <div className='flex flex-col justify-center bg-crimson h-96 w-full'>
        {/* work on the z-index to overlay photo or video behind text */}
        <div >
          <h2 className='text-white text-center font-gotham-light text-4xl m-2'> Always an </h2>
        </div>
        <div>
          <h1 className='text-white text-center font-look-script text-9xl'>Aggie</h1>
        </div>
      </div>
    </div>
    
    {headerVideo &&   
      // prioritize video over photo 
      <>
        <div>
        <video width="320" height="240" controls>
          <source src={headerVideo.url} type="video/mp4" />
        </video>

        </div>
      </>
    || 
    headerImg && 
    <>
      <div>
        <img src={headerImg.url} className="h-24 w-48 items-center" alt="Header Image"></img>
      </div>
    </>

    }
    </>
     
  )
}
