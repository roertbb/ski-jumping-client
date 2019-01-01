import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import Container from '../../components/Container';
import Spinner from '../../components/Spiner';
import { Table } from '../../components/Table';
import Link from '../../components/Link';

function IndividualCompetitionDetails({ match }) {
  const [indComp, setIndComp] = useState(undefined);

  const getIndComp = async comp_id => {
    try {
      const res = await axios.get(`/individual-competition/${comp_id}`);
      if (res.status === 200) setIndComp(res.data.indComp);
    } catch (error) {
      setIndComp(null);
    }
  };

  useEffect(() => {
    getIndComp(match.params.id);
  }, []);

  return (
    <>
      <Container>
        {indComp === null ? (
          <p>{`Individual Competition with id ${
            match.params.id
          } doesn't exists.`}</p>
        ) : !indComp ? (
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
                  <th>Qualification Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{indComp.competition_date}</td>
                  <td>{indComp.start_gate}</td>
                  <td>
                    <Link
                      to={`/tournament/${indComp.tournament &&
                        indComp.tournament.tournament_id}`}
                    >
                      {indComp.tournament && indComp.tournament.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/ski-jumping-hill/${
                        indComp.hill.ski_jumping_hill_id
                      }`}
                    >
                      {indComp.hill.name}
                    </Link>
                  </td>
                  <td>{indComp.qualification_date}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );
}

export default withRouter(IndividualCompetitionDetails);
