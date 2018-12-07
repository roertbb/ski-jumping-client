import React from 'react';
import useData from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Table from '../../components/Table';
import SkiJumpingHillForm from './SkiJumpingHillForm';
import SkiJumpingHillSearchForm from './SkiJumpingHillSearchForm';

function SkiJumpingHillPage() {
  const [
    skiJumpingHill,
    getSkiJumpingHill,
    addSkiJumpingHill,
    patchSkiJumpingHill,
    deleteSkiJumpingHill,
    message
  ] = useData('ski-jumping-hill');

  const [
    isModifyView,
    modifyValue,
    showModifyView,
    hideModifyView
  ] = useModal();

  return (
    <ContentWrapper>
      <Container blank>
        <h1>Ski Jumping Hill</h1>
        <Button color="info" onClick={() => showModifyView(null)}>
          Add Ski Jumping Hill
        </Button>
      </Container>
      {isModifyView ? (
        <Container>
          <SkiJumpingHillForm
            hideModifyView={hideModifyView}
            add={addSkiJumpingHill}
            patch={patchSkiJumpingHill}
            modifyValue={modifyValue}
          />
        </Container>
      ) : (
        <>
          <Container>
            <SkiJumpingHillSearchForm get={getSkiJumpingHill} />
          </Container>
          <Container>
            <h3>Search results</h3>
            <Table
              info
              labels={['Name', 'Country', 'City']}
              values={['name', 'country', 'city']}
              items={skiJumpingHill}
              itemsKey={'ski_jumping_hill_id'}
              del={deleteSkiJumpingHill}
              update={showModifyView}
            />
          </Container>
        </>
      )}
    </ContentWrapper>
  );
}

export default SkiJumpingHillPage;
