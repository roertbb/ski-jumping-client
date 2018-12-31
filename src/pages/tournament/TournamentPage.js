import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useDate from '../../hooks/useData';
import Table from '../../components/Table';
import TournamentForm from './TournamentForm';
import TournamentSearchForm from './TournamentSearchForm';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import TournamentDetails from './TournamentDetails';

function Tournament(props) {
  const [
    tournaments,
    getTournaments,
    addTournaments,
    patchTournaments,
    deleteTournaments,
    message
  ] = useDate('tournament');

  const [modElem, setModElem] = useState(null);

  const updateTournament = tournament => {
    setModElem(tournament);
    props.history.push('/tournament/modify');
  };

  const searchView = () => (
    <>
      <Container>
        <TournamentSearchForm get={getTournaments} />
      </Container>
      <Container>
        <Table
          info
          route={'tournament'}
          labels={['Name', 'Edition']}
          values={['name', 'edition']}
          items={tournaments}
          itemsKey={'tournament_id'}
          del={deleteTournaments}
          update={updateTournament}
        />
      </Container>
    </>
  );

  const modifyView = () => (
    <Container>
      <TournamentForm
        add={addTournaments}
        patch={patchTournaments}
        modifyValue={modElem}
      />
    </Container>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Tournament</h1>
          <Button
            color="info"
            onClick={() => {
              setModElem(null);
              props.history.push(
                props.location.pathname === '/tournament'
                  ? '/tournament/add'
                  : '/tournament'
              );
            }}
          >
            {props.location.pathname === '/tournament'
              ? 'Add Tournament'
              : 'back to Search'}
          </Button>
        </Container>
        <Switch>
          <Route exact path="/tournament" render={searchView} />
          <Route path="/tournament/add" render={modifyView} />
          <Route path="/tournament/modify" render={modifyView} />
          <Route path="/tournament/:id" render={() => <TournamentDetails />} />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(Tournament);
