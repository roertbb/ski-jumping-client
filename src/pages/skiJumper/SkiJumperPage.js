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

  const SearchView = () => (
    <>
      <Container>
        <SkiJumperSearchForm get={getSkiJumpers} />
      </Container>
      <Container>
        <Table
          info
          route={'ski-jumper'}
          labels={['Firstname', 'Surname']}
          values={['first_name', 'surname']}
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
          {props.location.pathname === '/ski-jumper' ? (
            <Button
              color="info"
              onClick={() => props.history.push('/ski-jumper/add')}
            >
              Add Ski Jumper
            </Button>
          ) : (
            <Button color="info" onClick={() => props.history.goBack()}>
              back to Search
            </Button>
          )}
        </Container>
        <Switch>
          <Route exact path="/ski-jumper" render={SearchView} />
          <Route path="/ski-jumper/add" render={modifyView} />
          <Route path="/ski-jumper/modify" render={modifyView} />
          <Route path="/ski-jumper/:id" render={() => <SkiJumperDetails />} />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(SkiJumper);
