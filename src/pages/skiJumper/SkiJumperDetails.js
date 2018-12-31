import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import Container from '../../components/Container';
import Spinner from '../../components/Spiner';
import { Table } from '../../components/Table';
import Link from '../../components/Link';

function SkiJumperDetails({ match }) {
  const [skiJumper, setSkiJumper] = useState(undefined);

  const getSkiJumper = async person_id => {
    try {
      const res = await axios.get(`/ski-jumper/${person_id}`);
      if (res.status === 200) setSkiJumper(res.data.skiJumper);
    } catch (error) {
      setSkiJumper(null);
    }
  };

  useEffect(() => {
    getSkiJumper(match.params.id);
  }, []);

  return (
    <>
      <Container>
        {skiJumper === null ? (
          <p>{`Ski Jumper with id ${match.params.id} doens't exists.`}</p>
        ) : !skiJumper ? (
          <Spinner />
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Birthdate</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>BMI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{skiJumper.first_name}</td>
                  <td>{skiJumper.surname}</td>
                  <td>{skiJumper.birth_date}</td>
                  <td>{skiJumper.height}</td>
                  <td>{skiJumper.weight}</td>
                  <td>{skiJumper.bmi.toFixed(3)}</td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>FIS ID</th>
                  <th>Personal Best</th>
                  <th>Classification</th>
                  <th>Classification Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={`/team/${skiJumper.team_id}`}>
                      {skiJumper.team}
                    </Link>
                  </td>
                  <td>{skiJumper.fis_id}</td>
                  <td>{skiJumper.personal_best}</td>
                  <td>{skiJumper.classification}</td>
                  <td>{skiJumper.classification_points}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
}

export default withRouter(SkiJumperDetails);
