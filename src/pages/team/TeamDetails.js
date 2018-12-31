import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import Container from '../../components/Container';
import Spinner from '../../components/Spiner';
import { Table } from '../../components/Table';
import Link from '../../components/Link';
import Button from '../../components/Button';

function TeamDetails({ match }) {
  const [team, setTeam] = useState(undefined);

  const getTeam = async team_id => {
    try {
      const res = await axios.get(`/team/${team_id}`);
      if (res.status === 200) setTeam(res.data.team);
    } catch (error) {
      setTeam(null);
    }
  };

  useEffect(() => {
    getTeam(match.params.id);
  }, []);

  return (
    <>
      {team === null ? (
        <Container>
          <p>{`Team with id ${match.params.id} doesn't exists.`}</p>
        </Container>
      ) : !team ? (
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
                  <th>Classification</th>
                  <th>Classification Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{team.team}</td>
                  <td>{team.classification}</td>
                  <td>{team.classification_points}</td>
                </tr>
              </tbody>
            </Table>
          </Container>
          <Container>
            <h3>{`Ski Jumpers that belongs to ${team.team}`}</h3>
            {team.skiJumpers.length === 0 ? (
              <p>Team has no ski jumpers</p>
            ) : (
              <Table single>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Surname</th>
                    <th>Classification</th>
                    <th>Classification Points</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {team.skiJumpers.map(skiJumper => (
                    <tr key={skiJumper.person_id}>
                      <td>{skiJumper.first_name}</td>
                      <td>{skiJumper.surname}</td>
                      <td>{skiJumper.classification}</td>
                      <td>{skiJumper.classification_points}</td>
                      <td>
                        <Link to={`/ski-jumper/${skiJumper.person_id}`}>
                          <Button color="info">
                            <span role="img" aria-label="info">
                              🔍
                            </span>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Container>
          <Container>
            <h3>{`Coaches that belongs to ${team.team}`}</h3>
            {team.coaches.length === 0 ? (
              <p>The team has no coaches</p>
            ) : (
              <Table single>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Surname</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {team.coaches.map(coach => (
                    <tr key={coach.person_id}>
                      <td>{coach.first_name}</td>
                      <td>{coach.surname}</td>
                      <td>
                        <Link to={`/coach/${coach.person_id}`}>
                          <Button color="info">
                            <span role="img" aria-label="info">
                              🔍
                            </span>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Container>
        </>
      )}
    </>
  );
}

export default withRouter(TeamDetails);
