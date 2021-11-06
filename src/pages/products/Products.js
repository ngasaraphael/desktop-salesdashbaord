import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './products.modules.css';
import Widget from '../../components/widgets/Widget';
import DeleteModal from '../../components/modal/DeleteModal';

const Products = () => {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    // table data
    async function getData() {
      const res = await axios.get(
        'https://sales-dashboard-server.herokuapp.com/item/get'
      );

      const items = res.data;
      setTableData(items);
    }
    getData();
  }, []);

  const handleDelete = () => {
    //// this will delete just from UI
    // const newData = [...tableData];
    // newData.splice(i, 1);
    // setTableData(newData);

    //// this will delete just from database
    let id = currentRow._id;

    axios
      .delete(`https://sales-dashboard-server.herokuapp.com/item/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        alert('Something went wrong. Item could not be deleted');
      });
  };

  const renderRow = (data, i) => (
    <tr key={i}>
      <th scope='row'>{i}</th>
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td>{data.costprice}</td>
      <td>{data.sellingprice}</td>
      <td>
        <button
          onClick={() => {
            handleUpdate(i);
          }}
          className='editItemIcon'
        >
          <i className='fas fa-edit'></i>
        </button>
        <button
          className='deleteBtn'
          onClick={() => {
            // handleDelete(i);
            setOpenModal(true);
            setCurrentRow(data);
          }}
        >
          <i className='far fa-trash-alt'></i>
        </button>
      </td>
    </tr>
  );

  const handleUpdate = (i) => {
    let currentRow = tableData[i];
    localStorage.setItem('item', JSON.stringify(currentRow));
    window.open('/edititem', '_self');
  };

  return (
    <div className='products'>
      <Widget />
      <div className='table'>
        <h3 className='productTitle'>Product Sales of the Month</h3>

        <div className='searchBar'>
          <input
            type='text'
            placeholder='Search item....'
            className='searchItemInput'
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <Link to='/additem'>
            <button>Add item</button>
          </Link>
        </div>

        <Table className='table-striped'>
          <thead className='tableHead'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Item</th>
              <th scope='col'>Description</th>
              <th scope='col'>Cost Price ($)</th>
              <th scope='col'>Sales Price ($)</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData
              .filter((value) => {
                if (searchTerm === '') {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  value.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((data, i) => renderRow(data, i))}
          </tbody>
        </Table>
      </div>
      {openModal && (
        <DeleteModal setOpenModal={setOpenModal} confirmAction={handleDelete} />
      )}
    </div>
  );
};

export default Products;
