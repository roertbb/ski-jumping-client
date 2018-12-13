import React from 'react';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
// import IndividualCompetitionForm from './individualCompetitionForm';
// import IndividualCompetitionSearchForm from './individualCompetitionSearchFrom';

function Placement() {
  const [
    placement,
    getPlacement,
    addPlacement,
    patchPlacement,
    deletePlacement,
    message
  ] = useDate('individual-competition', ['ski_jumper_id', 'competition_id']);

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
          <h1>Placement</h1>
          <Button color="info" onClick={() => showModifyView(null)}>
            Add Placement
          </Button>
        </Container>
        {isModifyView ? (
          <Container>
            {/* <IndividualCompetitionForm
              hideModifyView={hideModifyView}
              add={addPlacement}
              patch={patchPlacement}
              modifyValue={modifyValue}
            /> */}
          </Container>
        ) : (
          <>
            <Container>
              {/* <IndividualCompetitionSearchForm get={getPlacement} /> */}
            </Container>
            <Container>
              <Table
                labels={['Date', 'Tournament', 'Hill']}
                values={['competition_date', 'tournament_id', 'hill_id']}
                items={placement}
                itemsKey={'competition_id'}
                del={deletePlacement}
                update={showModifyView}
              />
            </Container>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Placement;
