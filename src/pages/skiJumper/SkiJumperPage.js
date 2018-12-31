import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useDate from '../../hooks/useData';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import SkiJumperForm from './SkiJumperForm';
import SkiJumperSearchForm from './SkiJumperSearchForm';
import SkiJumperDetails from './SkiJumperDetails';

function SkiJumper(props) {
  const [
    skiJumpers,
    getSkiJumpers,
    addSkiJumpers,
    patchSkiJumpers,
    deleteSkiJumpers,
    message
  ] = useDate('ski-jumper', 'person_id');

  const [modElem, setModElem] = useState(null);

  const updateSkiJumper = skiJumper => {
    setModElem(skiJumper);
    props.history.push('/ski-jumper/modify');
  };

  const searchView = () => (
    <>
      <Container>
        <SkiJumperSearchForm get={getSkiJumpers} />
      </Container>
      <Container>
        <Table
          info
          route={'ski-jumper'}
          labels={[
            'Classification',
            'Firstname',
            'Surname',
            'Classification Points'
          ]}
          values={[
            'classification',
            'first_name',
            'surname',
            'classification_points'
          ]}
          items={skiJumpers}
          itemsKey={'person_id'}
          del={deleteSkiJumpers}
          update={updateSkiJumper}
        />
      </Container>
    </>
  );

  const modifyView = () => (
    <Container>
      <SkiJumperForm
        add={addSkiJumpers}
        patch={patchSkiJumpers}
        modifyValue={modElem}
      />
    </Container>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Ski Jumper</h1>
          <Button
            color="info"
            onClick={() => {
              setModElem(null);
              props.history.push(
                props.location.pathname === '/ski-jumper'
                  ? '/ski-jumper/add'
                  : '/ski-jumper'
              );
            }}
          >
            {props.location.pathname === '/ski-jumper'
              ? 'Add Ski Jumper'
              : 'back to Search'}
          </Button>
        </Container>
        <Switch>
          <Route exact path="/ski-jumper" render={searchView} />
          <Route path="/ski-jumper/add" render={modifyView} />
          <Route path="/ski-jumper/modify" render={modifyView} />
          <Route path="/ski-jumper/:id" render={() => <SkiJumperDetails />} />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(SkiJumper);
