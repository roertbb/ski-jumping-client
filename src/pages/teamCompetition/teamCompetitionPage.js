import React from 'react';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import TeamCompetitionForm from './teamCompetitionForm';
import TeamCompetitionSearchForm from './teamCompetitionSearchPage';

function TeamCompetition() {
  const [
    teamCompetitions,
    getTeamComp,
    addTeamComp,
    patchTeamComp,
    deleteTeamComp,
    message
  ] = useDate('team-competition', 'competition_id');

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
          <h1>Team Competitions</h1>
          <Button color="info" onClick={() => showModifyView(null)}>
            Add Team Competition
          </Button>
        </Container>
        {isModifyView ? (
          <Container>
            <TeamCompetitionForm
              hideModifyView={hideModifyView}
              add={addTeamComp}
              patch={patchTeamComp}
              modifyValue={modifyValue}
            />
          </Container>
        ) : (
          <>
            <Container>
              <TeamCompetitionSearchForm get={getTeamComp} />
            </Container>
            <Container>
              <Table
                labels={['Date', 'Tournament', 'Hill']}
                values={['competition_date', 'tournament_id', 'hill_id']}
                items={teamCompetitions}
                itemsKey={'competition_id'}
                del={deleteTeamComp}
                update={showModifyView}
              />
            </Container>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default TeamCompetition;
