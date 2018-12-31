import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import Container from '../../components/Container';
import Spinner from '../../components/Spiner';
import { Table } from '../../components/Table';
import Link from '../../components/Link';

function CoachDetails({ match }) {
  const [coach, setCoach] = useState(undefined);

  const getCoach = async person_id => {
    try {
      const res = await axios.get(`/coach/${person_id}`);
      if (res.status === 200) setCoach(res.data.coach);
    } catch (error) {
      setCoach(null);
    }
  };

  useEffect(() => {
    getCoach(match.params.id);
  }, []);

  return (
    <>
      <Container>
        {coach === null ? (
          <p>{`Coach with id ${match.params.id} doens't exists.`}</p>
        ) : !coach ? (
          <Spinner />
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Birthdate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{coach.first_name}</td>
                  <td>{coach.surname}</td>
                  <td>{coach.birth_date}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
}

export default withRouter(CoachDetails);
