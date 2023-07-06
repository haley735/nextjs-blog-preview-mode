import Link from 'next/link';
import React from 'react';
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
  
  return (
    <>
    <nav aria-label="primary" className="bg-crimson fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src={logo && logo} className="h-24 w-48 mr-6 ml-36" alt="Alumni Logo"></img>
        </a>
      <div className="flex md:order-2">
          <button type="button" className="mr-24 text-crimson bg-white hover:bg-lightgrey focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Give Back</button>
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
          {pages && pages.map((page, index) => {
              return (
              <React.Fragment key={'menu-item-' + index}>
                <div key={'relative-group-' + index} className="relative group">
                <button key={'page-'+ page.title + '-' + index} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-lightgrey mr-4"><Link href={'/' + page.slug}>{page.title}</Link></button>
                <div key={'submenu-' + page.title + '-' + index} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 group-hover:block">
                {subpages && subpages.map((subpage, index) => {
                  return (
                    <>
                      <div key={'dropdown-' + subpage.title + '-' + index} className="px-2 pt-2 pb-4 shadow-lg">
                        <Link key={'subpage-' + subpage.tite + '-' + index} href={'/' + subpage.slug} className="block mt-4 lg:inline-block lg:mt-0 text-crimson hover:text-black mr-4">{subpage.title}</Link>
                      </div>
                    </>
                    
                    );
                  })}

                </div>
                </div>  

              </React.Fragment>
              );
            })}
        </ul>
      </div>
      </div>
    </nav>
    <div className='bg-crimson h-48 w-full'>
            {/* work on the z-index to overlay photo or video behind text */}
            <h2 className='text-white text-center'> Always An </h2>
            <h1 className='text-white text-center'>Aggie</h1>
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
    } || 
    {headerMedia && 
    <>
      <div>
        <img src={headerMedia.url} className="h-24 w-48 items-center" alt="Header Image"></img>
      </div>
    </>

    }
    </>
     
  )
}
