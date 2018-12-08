import React from 'react';
import useDate from '../../hooks/useData';
import useModal from '../../hooks/useModal';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import SkiJumperForm from './SkiJumperForm';
import SkiJumperSearchForm from './SkiJumperSearchForm';

function SkiJumper() {
  const [
    skiJumpers,
    getSkiJumpers,
    addSkiJumpers,
    patchSkiJumpers,
    deleteSkiJumpers,
    message
  ] = useDate('ski-jumper', 'person_id');

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
          <h1>Ski Jumper</h1>
          <Button color="info" onClick={() => showModifyView(null)}>
            Add Ski Jumper
          </Button>
        </Container>
        {isModifyView ? (
          <Container>
            <SkiJumperForm
              hideModifyView={hideModifyView}
              add={addSkiJumpers}
              patch={patchSkiJumpers}
              modifyValue={modifyValue}
            />
          </Container>
        ) : (
          <>
            <Container>
              <SkiJumperSearchForm get={getSkiJumpers} />
            </Container>
            <Container>
              <Table
                labels={['Firstname', 'Surname']}
                values={['first_name', 'surname']}
                items={skiJumpers}
                itemsKey={'person_id'}
                del={deleteSkiJumpers}
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
