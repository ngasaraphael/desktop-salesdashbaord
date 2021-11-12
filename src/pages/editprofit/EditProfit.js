import React, { useState } from 'react';
import axios from 'axios';
import './editProfit.modules.css';
import { InfoAlert } from '../../components/alert/Alert';

const EditProfit = () => {
  //get id of item to be updated from local storage
  let item = JSON.parse(localStorage.getItem('monthprofit'));
  console.log(item);
  let id = item._id;
  const [month, setMonth] = useState(item.month);
  const [costprice, setCostprice] = useState(item.costprice);
  const [salesprice, setSalesprice] = useState(item.salesprice);
  const [profit, setProfit] = useState(item.profit);
  const [alertText, setAlertText] = useState('');

  //hide error message after 5s
  if (alertText) {
    setTimeout(() => {
      setAlertText('');
    }, 4500);
  }

  const updateProfit = (e) => {
    e.preventDefault();

    if (month === '' || costprice === '' || salesprice === '') {
      setAlertText('Please select an item from products tap to update');
      return false;
    }

    axios
      .patch(
        `https://salesdashboard-server.herokuapp.com/chart/${id}`,

        {
          month: month,
          costprice: costprice,
          salesprice: salesprice,
          profit: profit,
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);

        // window.open('/products', '_self');
        setAlertText('Item has been Updated to list');
        setMonth('');
        setSalesprice('');
        setCostprice('');
        setProfit('');
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
            <label htmlFor='item'>Month</label>
            <input
              id='month'
              type='text'
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <div className='formGroup'>
            <label htmlFor='costprice'>Cost price</label>
            <input
              type='number'
              value={costprice}
              onChange={(e) => setCostprice(e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label htmlFor='sellingprice'>Sales price</label>
            <input
              type='number'
              value={salesprice}
              onChange={(e) => setSalesprice(e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label htmlFor='profit'>Profit</label>
            <input
              type='number'
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
            />
          </div>
          <div className='formBtns'>
            <input
              type='submit'
              value='Update Item'
              onClick={updateProfit}
              className='formInputBtn'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfit;
