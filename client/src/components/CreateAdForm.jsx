import axios from 'axios';
import React, { useState } from 'react';

function CreateAdForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    //createAd({ title, description, image, price, category });
    try{
      const response = await axios.post('/api/ads/create-ad/',
        JSON.stringify({ title, description, category, price }),
        {
            headers: { 'Content-Type': 'application/json' },
        }
      );
      //delete later
      console.log(JSON.stringify(response?.data));
    } catch(error){
      console.error('Error:', error);
    }
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
        <select id="CATEGORY_CHOICES" value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}>
          <option value="">Select:</option>
          <option value='IW'>Items Wanted</option>
          <option value='IS'>Items for Sale</option>
          <option value="AS">Academic Services</option>
        </select>
      </label>
      <label style={{ marginBottom: '5px' }}>
        Price:
        <br />
        <input type="text" value={price} onChange={e => setPrice(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
      </label>
      <input type="submit" value="Post" style={{ backgroundColor: '#003A79', color: 'white', padding: '14px 20px', border: 'none', cursor: 'pointer', width: '100%', opacity: '0.9' }} />    </form>
  );
}


export default CreateAdForm;