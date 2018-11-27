import React from 'react';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
import TournamentForm from './TournamentForm';
import TournamentSearchForm from './TournamentSearchForm';

function Tournament() {
  const [
    tournaments,
    getTournaments,
    addTournaments,
    patchTournaments,
    deleteTournaments,
    message
  ] = useDate('tournament');

  const [isModalOpen, modalValue, openModal, closeModal] = useModal();

  return (
    <>
      <Card className="mt-3 mb-3">
        <CardHeader>
          <h1>Tournaments</h1>
        </CardHeader>
        <CardBody>
          <TournamentSearchForm get={getTournaments} />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Button color="primary" onClick={() => openModal(null)}>
            Add Tournament
          </Button>
          {message && <p>{message.message}</p>}
          <Table
            noInfo
            labels={['Name', 'Edition']}
            values={['name', 'edition']}
            items={tournaments}
            itemsKey={'tournament_id'}
            del={deleteTournaments}
            update={openModal}
          />
        </CardBody>
      </Card>
      {isModalOpen && (
        <TournamentForm
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          add={addTournaments}
          patch={patchTournaments}
          modalValue={modalValue}
        />
      )}
    </>
  );
}

export default Tournament;
