import React from 'react';
import './Header.css';

export default function App({heading, subheading,src, updateCover, addPost}) {
  return (
    <header>
      <label className='d-block'>
      <div
      title='Click to change cover image'
        className='p-5 mb-7 text-center bg-image cursor-pointer'
        style={{ backgroundImage: `url(${src || 'https://source.unsplash.com/random/1321x583/?nature'})`, height: 400 }}
      > 
      <p className='h3 opacity-25'>Home</p>
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h2 className='h2 mb-3 opacity-90'>{heading}</h2>
              <h1 className='h4 mb-3 opacity-80'>{subheading}</h1>
              <div className='opacity-95 btn btn-outline-light btn-lg createPost fw-bold ' role='button'
              title='Click to create a new post'  onClick={addPost} >
                Create  Post
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="file" className='d-none' onChange={updateCover}/>
      </label>
      {/* <p className='mt-4'>Scroll down</p> */}
    </header>
  );
}