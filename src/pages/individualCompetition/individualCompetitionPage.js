import React from 'react';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import IndividualCompetitionForm from './individualCompetitionForm';
import IndividualCompetitionSearchForm from './individualCompetitionSearchFrom';

function IndividualCompetition() {
  const [
    individualCompetitions,
    getIndComp,
    addIndComp,
    patchIndComp,
    deleteIndComp,
    message
  ] = useDate('individual-competition', 'competition_id');

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
          <h1>Individual Competitions</h1>
          <Button color="info" onClick={() => showModifyView(null)}>
            Add Individual Competition
          </Button>
        </Container>
        {isModifyView ? (
          <Container>
            <IndividualCompetitionForm
              hideModifyView={hideModifyView}
              add={addIndComp}
              patch={patchIndComp}
              modifyValue={modifyValue}
            />
          </Container>
        ) : (
          <>
            <Container>
              <IndividualCompetitionSearchForm get={getIndComp} />
            </Container>
            <Container>
              <Table
                labels={['Date', 'Tournament', 'Hill']}
                values={['competition_date', 'tournament_id', 'hill_id']}
                items={individualCompetitions}
                itemsKey={'competition_id'}
                del={deleteIndComp}
                update={showModifyView}
              />
            </Container>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default IndividualCompetition;
