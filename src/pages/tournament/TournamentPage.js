import React from 'react';
import TournamentForm from './TournamentForm';
import useModal from '../../hooks/useModal';
import useDate from '../../hooks/useData';
import Table from '../../components/Table';
import { Card, CardBody, CardHeader } from 'reactstrap';

function Tournament() {
  const [
    tournaments,
    getTournaments,
    addTournaments,
    patchTournaments,
    deleteTournaments,
    message
  ] = useDate('tournament');

  const [open, value, openModal, closeModal] = useModal();

  return (
    <>
      <Card className="mt-3 mb-3">
        <CardBody>
          <h1>Tournaments</h1>
          <TournamentForm />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Table
            noInfo
            labels={['Name', 'Edition']}
            values={['name', 'edition']}
            items={tournaments}
            itemsKey={'tournament_id'}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default Tournament;
