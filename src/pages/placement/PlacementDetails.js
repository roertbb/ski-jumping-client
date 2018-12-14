import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import useData from '../../hooks/useData';
import Row from '../../components/Row';
import axios from '../../axios';

function PlacementDetails({ setView, competitionId, personId, setSeriesData }) {
  const [skiJumper] = useData('ski-jumper', 'person_id');
  const filteredSkiJumper = skiJumper.filter(
    skiJumper => skiJumper.person_id === personId
  )[0];

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
      <Container blank>
        <h1>Placement</h1>
        <Button color="info" onClick={() => setView('placement')}>
          back to Placement
        </Button>
      </Container>
      <Container>
        <h3>Ski Jumper</h3>
        {filteredSkiJumper && (
          <>
            <p>{`${filteredSkiJumper.first_name} ${
              filteredSkiJumper.surname
            }`}</p>
          </>
        )}
      </Container>
      {[first, second].map((series, index) => {
        return (
          <Container key={index}>
            {series === null ? (
              <>
                <p>{`Enter #${index + 1} Series Result for Ski Jumper`}</p>
                <Row>
                  <Button
                    color="info"
                    onClick={() => {
                      setView('edit_series');
                      setSeriesData(index + 1);
                    }}
                  >
                    Enter Series Result
                  </Button>
                </Row>
              </>
            ) : (
              <>
                <h3>{`#${series.series_id} series results`}</h3>
                <p>
                  <b>state:</b> {series.state}
                </p>
                <p>
                  <b>distance:</b> {series.distance}
                </p>
                <p>
                  <b>gate:</b> {series.gate}
                </p>
                <p>
                  <b>style points:</b> {series.style_points}
                </p>
                <p>
                  <b>distance points:</b> {series.distance_points}
                </p>
                <p>
                  <b>gate points:</b> {series.gate_points}
                </p>
                <p>
                  <b>wind points:</b> {series.wind_points}
                </p>
                <Row>
                  <Button
                    onClick={() => {
                      setSeriesData(series.series_id);
                      setView('edit_series');
                    }}
                    color="edit"
                    type="button"
                  >
                    <span role="img" aria-label="update">
                      ✍
                    </span>
                  </Button>
                </Row>
              </>
            )}
          </Container>
        );
      })}
    </>
  );
}

export default PlacementDetails;
