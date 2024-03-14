import Sidebar from 'components/Sidebar';
import CreateAdForm from 'components/CreateAdForm';

function CreatePage(){
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="bg-white py-6 sm:py-6">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h1 className="text-5xl font-semibold mb-4">Create Ad</h1>
                <div className="mt-8">
                  <CreateAdForm />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;