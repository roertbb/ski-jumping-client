import { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import axios from '../axios';
import { MessageContext } from '../context/MessageContext';

const endpointToName = {
  'ski-jumper': 'Ski Jumper',
  coach: 'Coach',
  team: 'Team',
  'ski-jumping-hill': 'Ski Jumping Hill',
  tournament: 'Tournament',
  'individual-competition': 'Individual Competition',
  'team-competition': 'Team Competition',
  placement: 'Placement'
};

const useData = function(endpoint, tableId, sort = false) {
  const dataId = tableId ? tableId : `${endpoint}_id`.replace('-', '_');

  const entityName = endpointToName[endpoint];

  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const { addMessage } = useContext(MessageContext);

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
      } else throw new Error();
    } catch (error) {
      addMessage(`Error fetching ${entityName}`, 'danger');
      const { errorMessage } = error.response.data;
      const statusInfo = errorMessage.length
        ? `Error fetching ${entityName}. ${errorMessage}`
        : `Error fetching ${entityName}`;
      addMessage(statusInfo, 'danger');
    }
  };

  const deleteData = async id => {
    try {
      const queryParams = queryString.stringify(id);
      const response = await axios.delete(`${endpoint}?${queryParams}`);
      if (response.status === 200) {
        setData(
          data.filter(elem => {
            if (Array.isArray(dataId)) return elem[dataId] !== id[dataId];
            else {
              return Object.entries(id).filter(
                ([key, val]) => val !== elem[key]
              ).length;
            }
          })
        );
        addMessage(`Succesfully deleted ${entityName}`, 'success');
      } else throw new Error();
    } catch (error) {
      const { errorMessage } = error.response.data;
      const statusInfo = errorMessage.length
        ? `Error deleting ${entityName}. ${errorMessage}`
        : `Error deleting ${entityName}`;
      addMessage(statusInfo, 'danger');
    }
  };

  const addData = async params => {
    try {
      const response = await axios.post(`${endpoint}`, params);
      if (response.status === 200) {
        setData([...data, response.data.created]);
        addMessage(`Successfully created ${entityName}`, 'success');
        return true;
      } else throw new Error();
    } catch (error) {
      const { errorMessage } = error.response.data;
      const statusInfo = errorMessage.length
        ? `Error creating ${entityName}. ${errorMessage}`
        : `Error creating ${entityName}`;
      addMessage(statusInfo, 'danger');
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
        addMessage(`Successfully updated ${entityName}`, 'success');
        return true;
      } else throw new Error();
    } catch (error) {
      const { errorMessage } = error.response.data;
      const statusInfo = errorMessage.length
        ? `Error updating ${entityName}. ${errorMessage}`
        : `Error updating ${entityName}`;
      addMessage(statusInfo, 'danger');
      return false;
    }
  };

  return [data, getData, addData, patchData, deleteData];
};

export default useData;
