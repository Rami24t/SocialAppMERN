import React from 'react';
import './Header.css';

export default function App({heading, subheading,src, updateCover, addPost}) {
  return (
    <header>
      <label className='d-block'>
      <div
      title='Click to change cover image'
        className='p-5 mb-7 text-center bg-image'
        style={{ backgroundImage: `url(${src})`, height: 400 }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>{heading}</h1>
              <h4 className='mb-3'>{subheading}</h4>
              <div className='btn btn-outline-light btn-lg createPost' role='button'
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