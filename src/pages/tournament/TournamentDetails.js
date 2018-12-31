import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import Container from '../../components/Container';
import Spinner from '../../components/Spiner';
import { Table } from '../../components/Table';
import Link from '../../components/Link';
import Button from '../../components/Button';

function TournamentDetails({ match }) {
  const [tournament, setTournament] = useState(undefined);

  const getTournament = async tournament_id => {
    try {
      const res = await axios.get(`/tournament/${tournament_id}`);
      if (res.status === 200) setTournament(res.data.tournament);
    } catch (error) {
      setTournament(null);
    }
  };

  useEffect(() => {
    getTournament(match.params.id);
  }, []);

  console.log(tournament);

  return (
    <>
      {tournament === null ? (
        <Container>
          <p>{`Tournament with id ${match.params.id} doesn't exists.`}</p>
        </Container>
      ) : !tournament ? (
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
                  <th>Edition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{tournament.name}</td>
                  <td>{tournament.edition}</td>
                </tr>
              </tbody>
            </Table>
          </Container>
          <Container>
            <h3>{`Individual Competitions that belongs to ${
              tournament.name
            }`}</h3>
            {tournament.individualCompetitions.length === 0 ? (
              <p>Tournament has no individual competitions</p>
            ) : (
              <Table single>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Ski Jumping Hill</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {tournament.individualCompetitions.map(comp => (
                    <tr key={comp.competition_id}>
                      <td>{comp.competition_date}</td>
                      <td>{comp.name}</td>
                      <td>{comp.city}</td>
                      <td>{comp.country}</td>
                      <td>
                        <Link
                          to={`/individual-competition/${comp.competition_id}`}
                        >
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

export default withRouter(TournamentDetails);
