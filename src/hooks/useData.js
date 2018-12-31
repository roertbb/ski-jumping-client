import { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from '../axios';
import useMessage from './useMessage';

const useData = function(endpoint, tableId, sort = false) {
  const dataId = tableId ? tableId : `${endpoint}_id`.replace('-', '_');

  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async params => {
    try {
      const queryParams = queryString.stringify(params);
      const url = params === null ? endpoint : `${endpoint}?${queryParams}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        if (!sort) setData(response.data.results);
        else
          setData(
            response.data.results.sort((a, b) => {
              const aval = a[sort] === null ? 999999 : a[sort];
              const bval = b[sort] === null ? 999999 : b[sort];
              return aval < bval ? -1 : bval < aval ? 1 : 0;
            })
          );
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
        setData(
          data.filter(elem => {
            if (!Array.isArray(dataId)) return elem[dataId] !== id[dataId];
            else {
              return Object.entries(id).filter(
                ([key, val]) => val !== elem[key]
              ).length;
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
        return true;
      }
    } catch (error) {
      setMessage('danger', `error creating tournaments`);
      return false;
    }
  };

  const patchData = async (id, params) => {
    try {
      const queryParams = queryString.stringify(id);
      const response = await axios.patch(`${endpoint}?${queryParams}`, params);
      if (response.status === 201) {
        setData(
          data.map(elem => {
            if (Array.isArray(dataId))
              return elem[dataId] === id ? response.data.updated : elem;
            else {
              return Object.entries(id).filter(
                ([key, val]) => val === elem[key]
              ).length
                ? response.data.updated
                : elem;
            }
          })
        );
        setMessage('success', `successfully updated tournament`);
        return true;
      }
    } catch (error) {
      setMessage('danger', `error updating tournaments`);
      return false;
    }
  };

  const [message, setMessage] = useMessage();

  return [data, getData, addData, patchData, deleteData, message];
};

export default useData;
