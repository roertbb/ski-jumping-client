import React, { useEffect } from 'react';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import SkiJumperForm from './SkiJumperForm';
import SkiJumperSearchForm from './SkiJumperSearchForm';
import axios from '../../axios';

function SkiJumper() {
  const [
    skiJumpers,
    getSkiJumpers,
    addSkiJumpers,
    patchSkiJumpers,
    deleteSkiJumpers,
    message,
    choosenSkiJumper,
    setChoosenSkiJumper
  ] = useDate('ski-jumper', 'person_id');

  const [
    isModifyView,
    modifyValue,
    showModifyView,
    hideModifyView
  ] = useModal();

  const getBMI = async person_id => {
    const resp = await axios.get(`/ski-jumper/get-bmi?person_id=${person_id}`);
    await setChoosenSkiJumper({ ...choosenSkiJumper, bmi: resp.data.bmi });
  };

  useEffect(
    () => {
      choosenSkiJumper && getBMI(choosenSkiJumper.person_id);
    },
    [choosenSkiJumper && choosenSkiJumper.bmi]
  );

  let view = (
    <>
      <Container>
        <SkiJumperSearchForm get={getSkiJumpers} />
      </Container>
      <Container>
        <Table
          info={setChoosenSkiJumper}
          labels={['Firstname', 'Surname']}
          values={['first_name', 'surname']}
          items={skiJumpers}
          itemsKey={'person_id'}
          del={deleteSkiJumpers}
          update={showModifyView}
        />
      </Container>
    </>
  );
  if (isModifyView) {
    view = (
      <Container>
        <SkiJumperForm
          hideModifyView={hideModifyView}
          add={addSkiJumpers}
          patch={patchSkiJumpers}
          modifyValue={modifyValue}
        />
      </Container>
    );
  } else if (choosenSkiJumper) {
    view = (
      <>
        <p>bmi: {choosenSkiJumper.bmi}</p>
      </>
    );
  }
  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Ski Jumper</h1>
          <Button color="info" onClick={() => showModifyView(null)}>
            Add Ski Jumper
          </Button>
        </Container>
        {view}
      </ContentWrapper>
    </>
  );
}

export default SkiJumper;
