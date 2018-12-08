import React from 'react';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import CoachForm from './CoachForm';
import CoachSearchForm from './CoachSearchPage';

function SkiJumper() {
  const [
    coaches,
    getCoaches,
    addCoaches,
    patchCoaches,
    deleteCoaches,
    message
  ] = useDate('coach', 'person_id');

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
          <h1>Coaches</h1>
          <Button color="info" onClick={() => showModifyView(null)}>
            Add Coach
          </Button>
        </Container>
        {isModifyView ? (
          <Container>
            <CoachForm
              hideModifyView={hideModifyView}
              add={addCoaches}
              patch={patchCoaches}
              modifyValue={modifyValue}
            />
          </Container>
        ) : (
          <>
            <Container>
              <CoachSearchForm get={getCoaches} />
            </Container>
            <Container>
              <Table
                labels={['Firstname', 'Surname']}
                values={['first_name', 'surname']}
                items={coaches}
                itemsKey={'person_id'}
                del={deleteCoaches}
                update={showModifyView}
              />
            </Container>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default SkiJumper;
