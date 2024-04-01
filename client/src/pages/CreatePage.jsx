import React from 'react';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import CreateAdForm from 'components/CreateAdForm';

function CreatePage({ onAdSubmit }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header/>
        <div className="bg-white py-6 sm:py-6">
            <div className="mx-auto lg:max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-4 p-4 rounded-md bg-custom-blue shadow-md px-2 py-2">
                <h1 className="text-5xl font-semibold" style={{color: 'white'}}>Create Ad</h1>              
              </div>
              <div className="mt-8">
                <article className="max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden my-5" style={{width: '100%', height: '550px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <CreateAdForm />
                </article>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;