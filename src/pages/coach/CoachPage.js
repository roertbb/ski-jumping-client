import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useDate from '../../hooks/useData';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import CoachForm from './CoachForm';
import CoachSearchForm from './CoachSearchPage';
import CoachDetails from './CoachDetails';

function Coach(props) {
  const [
    coaches,
    getCoaches,
    addCoaches,
    patchCoaches,
    deleteCoaches,
    message
  ] = useDate('coach', 'person_id');

  const [modElem, setModElem] = useState(null);

  const updateCoach = coach => {
    setModElem(coach);
    props.history.push('/coach/modify');
  };

  const SearchView = () => (
    <>
      <Container>
        <CoachSearchForm get={getCoaches} />
      </Container>
      <Container>
        <Table
          info
          route={'coach'}
          labels={['Firstname', 'Surname']}
          values={['first_name', 'surname']}
          items={coaches}
          itemsKey={'person_id'}
          del={deleteCoaches}
          update={updateCoach}
        />
      </Container>
    </>
  );

  const modifyView = () => (
    <Container>
      <CoachForm add={addCoaches} patch={patchCoaches} modifyValue={modElem} />
    </Container>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Coaches</h1>
          <Button
            color="info"
            onClick={() => {
              setModElem(null);
              props.history.push(
                props.location.pathname === '/coach' ? '/coach/add' : '/coach'
              );
            }}
          >
            {props.location.pathname === '/coach'
              ? 'Add Coach'
              : 'back to Search'}
          </Button>
        </Container>
        <Switch>
          <Route exact path="/coach" render={SearchView} />
          <Route path="/coach/add" render={modifyView} />
          <Route path="/coach/modify" render={modifyView} />
          <Route path="/coach/:id" render={() => <CoachDetails />} />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(Coach);
