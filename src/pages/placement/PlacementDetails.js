import React, { useEffect, useState } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Container from '../../components/Container';
import Button from '../../components/Button';
import useData from '../../hooks/useData';
import Row from '../../components/Row';
import axios from '../../axios';
import { Table } from '../../components/Table';
import OverlaySpinner from '../../components/SpinnerOverlay';

function PlacementDetails({ competitionId, personId, setSeriesData, history }) {
  const [skiJumper] = useData('ski-jumper', 'person_id');
  const filteredSkiJumper =
    skiJumper &&
    skiJumper.filter(skiJumper => skiJumper.person_id === personId)[0];

  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);

  useEffect(() => {
    getSeriesResult(1);
    getSeriesResult(2);
  }, []);

  const getSeriesResult = async id => {
    const resp = await axios.get(
      `/series-result?person_id=${personId}&competition_id=${competitionId}&series_id=${id}`
    );
    if (resp.status === 200) {
      const setter = [setFirst, setSecond][id - 1];
      setter(resp.data.results);
    }
  };

  return (
    <>
      {(!personId || !competitionId) && <Redirect to="/placement" />}
      <Container>
        {!filteredSkiJumper && <OverlaySpinner />}
        <h3>Ski Jumper</h3>
        {filteredSkiJumper && (
          <>
            <Table single>
              <thead>
                <tr>
                  <th>Classification</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Classification Points</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{filteredSkiJumper.classification}</td>
                  <td>{filteredSkiJumper.first_name}</td>
                  <td>{filteredSkiJumper.surname}</td>
                  <td>{filteredSkiJumper.classification_points}</td>
                  <td>
                    <Link to={`/ski-jumper/${filteredSkiJumper.person_id}`}>
                      <Button color="info">
                        <span role="img" aria-label="info">
                          🔍
                        </span>
                      </Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Container>
      {[first, second].map((series, index) => {
        return (
          <Container key={index}>
            {!series && <OverlaySpinner />}
            {series === null ? (
              <>
                <p>{`Enter #${index + 1} Series Result for Ski Jumper`}</p>
                <Row>
                  <Button
                    color="info"
                    onClick={() => {
                      setSeriesData(index + 1);
                      history.push(
                        `/placement/${competitionId}/${personId}/${index + 1}`
                      );
                    }}
                  >
                    Enter Series Result
                  </Button>
                </Row>
              </>
            ) : (
              <>
                <Container blank>
                  <h3>{`#${series.series_id} Series Result`}</h3>
                  <Row>
                    <Button
                      onClick={() => {
                        setSeriesData(series.series_id);
                        history.push(
                          `/placement/${competitionId}/${personId}/${
                            series.series_id
                          }`
                        );
                      }}
                      color="edit"
                      type="button"
                    >
                      <span role="img" aria-label="update">
                        ✍
                      </span>
                    </Button>
                  </Row>
                </Container>
                <Table noActions>
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>Distance</th>
                      <th>Gate</th>
                      <th>Style Points</th>
                      <th>Distance Points</th>
                      <th>Gate Points</th>
                      <th>Wind Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{series.state}</td>
                      <td>{series.distance}</td>
                      <td>{series.gate}</td>
                      <td>{series.style_points}</td>
                      <td>{series.distance_points}</td>
                      <td>{series.gate_points}</td>
                      <td>{series.wind_points}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Container>
        );
      })}
    </>
  );
}

export default withRouter(PlacementDetails);
