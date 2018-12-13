import { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from '../axios';
import useMessage from './useMessage';

const useData = function(endpoint, tableId) {
  const dataId = tableId ? tableId : `${endpoint}_id`.replace('-', '_');

  const [data, setData] = useState([]);

  const [choosenItem, setChoosenItem] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async params => {
    try {
      const queryParams = queryString.stringify(params);
      const url = params === null ? endpoint : `${endpoint}?${queryParams}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data.results);
      } else {
        setMessage('danger', `error fetching tournaments`);
      }
    } catch (error) {
      setMessage('danger', `error fetching tournaments`);
    }
  };

  const deleteData = async id => {
    try {
      const queryParams = queryString.stringify(id);
      const response = await axios.delete(`${endpoint}?${queryParams}`);
      if (response.status === 200) {
        // setData(data.filter(elem => elem[dataId] !== id));
        setData(
          data.filter(elem => {
            if (!Array.isArray(dataId)) return elem[dataId] !== id[dataId];
            else {
              Object.entries(id).forEach(entry => {
                if (entry[1] !== elem[entry[0]]) return false;
              });
              return true;
            }
          })
        );
        setMessage('success', `successfully deleted tournament`);
      }
    } catch (error) {
      setMessage('danger', `error deleting tournaments`);
    }
  };

  const addData = async params => {
    try {
      const response = await axios.post(`${endpoint}`, params);
      if (response.status === 200) {
        setData([...data, response.data.created]);
        setMessage('success', `successfully created tournament`);
      }
    } catch (error) {
      setMessage('danger', `error creating tournaments`);
    }
  };

  const patchData = async (id, params) => {
    try {
      const queryParams = queryString.stringify(id);
      const response = await axios.patch(`${endpoint}?${queryParams}`, params);
      // const response = await axios.patch(`${endpoint}/${id}`, params);
      if (response.status === 201) {
        // data.map(elem => (elem[dataId] === id ? response.data.updated : elem))
        setData(
          data.map(elem => {
            if (Array.isArray(dataId))
              return elem[dataId] === id ? response.data.updated : elem;
            else {
              Object.entries(id).forEach(entry => {
                if (entry[1] !== elem[entry[0]]) return elem;
              });
              return response.data.updated;
            }
          })
        );

        setMessage('success', `successfully updated tournament`);
      }
    } catch (error) {
      setMessage('danger', `error updating tournaments`);
    }
  };

  const [message, setMessage] = useMessage();

  return [
    data,
    getData,
    addData,
    patchData,
    deleteData,
    message,
    choosenItem,
    setChoosenItem
  ];
};

export default useData;
