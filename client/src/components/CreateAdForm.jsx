import React, { useState } from 'react';

const createAd = (ad) => {
  // Implement your ad creation logic here
  console.log('Creating ad:', ad);
};

function CreateAdForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createAd({ title, description, image, price, category });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label style={{ marginBottom: '5px' }}>
        Image:
        <br />
        <input type="file" onChange={handleImageChange} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </label>
      <label style={{ marginBottom: '5px' }}>
        Title:
        <br />
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
      </label>
      <label style={{ marginBottom: '5px' }}>
        Description:
        <br />
        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
      </label>
      <label style={{ marginBottom: '5px' }}>
        Category:
        <br />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}>
          <option value="">Select:</option>
          <option value="Items Wanted">Items Wanted</option>
          <option value="Items for Sale">Items for Sale</option>
          <option value="Academic Services">Academic Services</option>
        </select>
      </label>
      <label style={{ marginBottom: '5px' }}>
        Price:
        <br />
        <input type="text" value={price} onChange={e => setPrice(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
      </label>
      <input type="submit" value="Post" class="bg-custom-blue rounded-md shadow-md px-2 py-2 hover:bg-custom-yellow" style={{ color: 'white', padding: '14px 20px', border: 'none', cursor: 'pointer', opacity: '0.9' }} />    
    </form>
  );
}


export default CreateAdForm;