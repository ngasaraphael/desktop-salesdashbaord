import React, { useState } from 'react';
import axios from 'axios';
import './editItem.modules.css';
import { InfoAlert } from '../../components/alert/Alert';

const EditItem = () => {
  //get id of item to be updated from local storage
  let item = JSON.parse(localStorage.getItem('item'));
  console.log(item);

  let id = item._id;
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [costprice, setCostprice] = useState(item.costprice);
  const [sellingprice, setSellingprice] = useState(item.sellingprice);
  const [alertText, setAlertText] = useState('');

  //hide error message after 5s
  if (alertText) {
    setTimeout(() => {
      setAlertText('');
    }, 4500);
  }

  const handleEditItem = (e) => {
    e.preventDefault();

    if (
      name === '' ||
      description === '' ||
      costprice === '' ||
      sellingprice === ''
    ) {
      setAlertText('Please select an item from products tap to update');
      return false;
    }

    axios
      .patch(
        `https://sales-dashboard-server.herokuapp.com/item/${id}`,

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

        // window.open('/products', '_self');
        setAlertText('Item has been Updated to list');
        setName('');
        setDescription('');
        setSellingprice('');
        setCostprice('');
      })
      .catch((e) => {
        console.log('error while updating item');
        setAlertText('An error occured while updating');
      });
  };

  return (
    <div className='addItemComponent'>
      <div className='addItemModal'>
        <form className='modalForm'>
          <div className='confirmAlert'>
            {alertText && <InfoAlert text={alertText} />}
          </div>
          <h3 className='addItemTitle'>Update Item</h3>
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
              value='Update Item'
              onClick={handleEditItem}
              className='formInputBtn'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
