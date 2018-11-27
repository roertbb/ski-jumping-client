import { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from '../axios';
import useMessage from './useMessage';

const useData = function(endpoint) {
  const [data, setData] = useState([]);

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
      const response = await axios.delete(`${endpoint}/${id}`);
      if (response.status === 200) {
        setData(data.filter(elem => elem.tournament_id !== id));
        setMessage('success', `successfully deleted tournament`);
      }
    } catch (error) {
      setMessage('danger', `error deleting tournaments`);
    }
  };

  const addData = async params => {
    try {
      const response = axios.post(`${endpoint}`, params);
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
      const response = await axios.patch(`${endpoint}/${id}`, params);
      if (response.status === 201) {
        setData(
          data.map(elem =>
            elem.tournament_id === id ? response.data.updated : elem
          )
        );
        setMessage('success', `successfully updated tournament`);
      }
    } catch (error) {
      setMessage('danger', `error updating tournaments`);
    }
  };

  const [message, setMessage] = useMessage();

  return [data, getData, addData, patchData, deleteData, message];
};

export default useData;
