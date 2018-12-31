import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import Container from '../../components/Container';
import Spinner from '../../components/Spiner';
import { Table } from '../../components/Table';
import Link from '../../components/Link';

function SkiJumpingHillDetails({ match }) {
  const [hill, setHill] = useState(undefined);

  const getHill = async hill_id => {
    try {
      const res = await axios.get(`/ski-jumping-hill/${hill_id}`);
      if (res.status === 200) setHill(res.data.hill);
    } catch (error) {
      setHill(null);
    }
  };

  useEffect(() => {
    getHill(match.params.id);
  }, []);

  return (
    <>
      {hill === null ? (
        <Container>
          <p>{`Ski Jumping Hill with id ${match.params.id} doesn't exists.`}</p>
        </Container>
      ) : !hill ? (
        <Container>
          <Spinner />
        </Container>
      ) : (
        <>
          <Container>
            <Table noActions>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{hill.name}</td>
                  <td>{hill.city}</td>
                  <td>{hill.country}</td>
                </tr>
              </tbody>
            </Table>
            <Table noActions>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Size</th>
                  <th>K-Point</th>
                  <th>Record</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ n: 'normal', b: 'big', m: 'mammoth' }[hill.type]}</td>
                  <td>{hill.size}</td>
                  <td>{hill.k_point}</td>
                  <td>{hill.record}</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </>
      )}
    </>
  );
}

export default withRouter(SkiJumpingHillDetails);
