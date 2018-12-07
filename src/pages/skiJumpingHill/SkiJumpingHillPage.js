import React from 'react';
import useData from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Table from '../../components/Table';
import SkiJumpingHillForm from './SkiJumpingHillForm';
import SkiJumpingHillSearchForm from './SkiJumpingHillSearchForm';

import Info from '../../components/Info';

function SkiJumpingHillPage() {
  const [
    skiJumpingHill,
    getSkiJumpingHill,
    addSkiJumpingHill,
    patchSkiJumpingHill,
    deleteSkiJumpingHill,
    message,
    choosenHill,
    setChoosenHill
  ] = useData('ski-jumping-hill');

  const [
    isModifyView,
    modifyValue,
    showModifyView,
    hideModifyView
  ] = useModal();

  let view = (
    <>
      <Container>
        <SkiJumpingHillSearchForm get={getSkiJumpingHill} />
      </Container>
      <Container>
        <Table
          info={setChoosenHill}
          labels={['Name', 'Country', 'City']}
          values={['name', 'country', 'city']}
          items={skiJumpingHill}
          itemsKey={'ski_jumping_hill_id'}
          del={deleteSkiJumpingHill}
          update={showModifyView}
        />
      </Container>
    </>
  );
  if (isModifyView) {
    view = (
      <Container>
        <SkiJumpingHillForm
          hideModifyView={hideModifyView}
          add={addSkiJumpingHill}
          patch={patchSkiJumpingHill}
          modifyValue={modifyValue}
        />
      </Container>
    );
  } else if (choosenHill) {
    view = <Info info={choosenHill} chooseItem={setChoosenHill} />;
  }

  return (
    <ContentWrapper>
      <Container blank>
        <h1>Ski Jumping Hill</h1>
        <Button color="info" onClick={() => showModifyView(null)}>
          Add Ski Jumping Hill
        </Button>
      </Container>
      {view}
    </ContentWrapper>
  );
}

export default SkiJumpingHillPage;
