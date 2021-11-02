import React, { useState } from 'react';
import axios from 'axios';
import './addItemModal.modules.css';
import { InfoAlert } from '../../components/alert/Alert';

const AddItemModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [costprice, setCostprice] = useState('');
  const [sellingprice, setSellingprice] = useState('');
  const [alertText, setAlertText] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();

    axios
      .post(
        'https://sales-dashboard-server.herokuapp.com/item',

        {
          name: name,
          description: description,
          costprice: costprice,
          sellingprice: sellingprice,
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);

        // window.open('/additem', '_self');
        setAlertText('Item has been added to list');
        setName('');
        setDescription('');
        setSellingprice('');
        setCostprice('');
      })
      .catch((e) => {
        console.log('error while adding item');
      });
  };

  return (
    <div className='addItemComponent'>
      <div className='addItemModal'>
        <form className='modalForm'>
          <div className='confirmAlert'>
            {alertText && <InfoAlert text={alertText} />}
          </div>
          <h3 className='addItemTitle'>Add new Item to list</h3>
          <div className='formGroup'>
            <label htmlFor='item'>Item</label>
            <input
              id='item'
              type='item'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label htmlFor='description'>Item description</label>
            <input
              id='description'
              type='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label htmlFor='costprice'>Cost price</label>
            <input
              id='costprice'
              type='number'
              value={costprice}
              onChange={(e) => setCostprice(e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label htmlFor='sellingprice'>Sales price</label>
            <input
              id='sellingprice'
              type='number'
              value={sellingprice}
              onChange={(e) => setSellingprice(e.target.value)}
            />
          </div>
          <div className='formBtns'>
            <input
              type='submit'
              value='Add Item'
              onClick={handleAddItem}
              className='formInputBtn'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
