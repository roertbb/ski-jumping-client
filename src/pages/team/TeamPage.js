import React from 'react';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
// import TournamentForm from './TournamentForm';
// import TournamentSearchForm from './TournamentSearchForm';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import TeamForm from './TeamForm';
import TeamSearchForm from './TeamSearchForm';

function Team() {
  const [teams, getTeams, addTeams, patchTeams, deleteTeams, message] = useDate(
    'team'
  );

  const [
    isModifyView,
    modifyValue,
    showModifyView,
    hideModifyView
  ] = useModal();

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Team</h1>
          <Button color="info" onClick={() => showModifyView(null)}>
            Add team
          </Button>
        </Container>
        {isModifyView ? (
          <Container>
            <TeamForm
              hideModifyView={hideModifyView}
              add={addTeams}
              patch={patchTeams}
              modifyValue={modifyValue}
            />
          </Container>
        ) : (
          <>
            <Container>
              <TeamSearchForm get={getTeams} />
            </Container>
            <Container>
              <Table
                labels={['Team Name', 'Classification']}
                values={['team', 'classification']}
                items={teams}
                itemsKey={'team_id'}
                del={deleteTeams}
                update={showModifyView}
              />
            </Container>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Team;
