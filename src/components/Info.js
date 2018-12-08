import React from 'react';
import Container from './Container';
import Row from './Row';
import Button from './Button';

function Info({ info, chooseItem }) {
  return (
    <>
      <Container>
        <Row info>
          {Object.entries(info)
            .filter(entry => !entry[0].match(/_id/))
            .map(entry => (
              <p key={entry[0]}>
                <b>{entry[0]}</b>: {entry[1]}
              </p>
            ))}
        </Row>
        <Row>
          <Button onClick={() => chooseItem(null)} color="info" type="button">
            Close
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default Info;
