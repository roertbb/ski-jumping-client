import React from 'react';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
import TournamentForm from './TournamentForm';
import TournamentSearchForm from './TournamentSearchForm';
import Content from '../../components/Content';
import Side from '../../components/Side';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';

function Tournament() {
  const [
    tournaments,
    getTournaments,
    addTournaments,
    patchTournaments,
    deleteTournaments,
    message
  ] = useDate('tournament');

  const [
    isModifyView,
    modifyValue,
    showModifyView,
    hideModifyView
  ] = useModal();

  return (
    <>
      <Content>
        <Side />
        <ContentWrapper>
          <Container blank>
            <h1>Tournament</h1>
            <Button color="info" onClick={() => showModifyView(null)}>
              Add tournament
            </Button>
          </Container>
          {isModifyView ? (
            <Container>
              <TournamentForm
                hideModifyView={hideModifyView}
                add={addTournaments}
                patch={patchTournaments}
                modifyValue={modifyValue}
              />
            </Container>
          ) : (
            <>
              <Container>
                <TournamentSearchForm get={getTournaments} />
              </Container>
              <Container>
                <h3>Search results</h3>
                <Table
                  labels={['Name', 'Edition']}
                  values={['name', 'edition']}
                  items={tournaments}
                  itemsKey={'tournament_id'}
                  del={deleteTournaments}
                  update={showModifyView}
                />
              </Container>
            </>
          )}
        </ContentWrapper>
      </Content>
    </>
  );
}

export default Tournament;
