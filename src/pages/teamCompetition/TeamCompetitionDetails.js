import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import Container from '../../components/Container';
import Spinner from '../../components/Spiner';
import { Table } from '../../components/Table';
import Link from '../../components/Link';

function TeamCompetitionDetails({ match }) {
  const [teamComp, setTeamComp] = useState(undefined);

  const getTeamComp = async comp_id => {
    try {
      const res = await axios.get(`/team-competition/${comp_id}`);
      if (res.status === 200) setTeamComp(res.data.teamComp);
    } catch (error) {
      setTeamComp(null);
    }
  };

  useEffect(() => {
    getTeamComp(match.params.id);
  }, []);

  return (
    <>
      <Container>
        {teamComp === null ? (
          <p>{`Team Competition with id ${match.params.id} doesn't exists.`}</p>
        ) : !teamComp ? (
          <Spinner />
        ) : (
          <>
            <Table noActions>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Gate</th>
                  <th>Tournament</th>
                  <th>Ski Jumping Hill</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{teamComp.competition_date}</td>
                  <td>{teamComp.start_gate}</td>
                  <td>
                    <Link
                      to={`/tournament/${teamComp.tournament &&
                        teamComp.tournament.tournament_id}`}
                    >
                      {teamComp.tournament && teamComp.tournament.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/ski-jumping-hill/${
                        teamComp.hill.ski_jumping_hill_id
                      }`}
                    >
                      {teamComp.hill.name}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
}

export default withRouter(TeamCompetitionDetails);
