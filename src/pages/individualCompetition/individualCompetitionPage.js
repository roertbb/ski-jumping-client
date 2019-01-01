import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useDate from '../../hooks/useData';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import IndividualCompetitionForm from './individualCompetitionForm';
import IndividualCompetitionSearchForm from './individualCompetitionSearchFrom';
import IndividualCompetitionDetails from './IndividualCompetitionDetails';

function IndividualCompetition(props) {
  const [
    individualCompetitions,
    getIndComp,
    addIndComp,
    patchIndComp,
    deleteIndComp,
    message
  ] = useDate('individual-competition', 'competition_id');

  const [modElem, setModElem] = useState(null);

  const updateIndComp = competition => {
    setModElem(competition);
    props.history.push('/individual-competition/modify');
  };

  const searchView = () => (
    <>
      <Container>
        <IndividualCompetitionSearchForm get={getIndComp} />
      </Container>
      <Container>
        <Table
          info
          route={'individual-competition'}
          labels={['Date', 'Tournament', 'Hill']}
          values={['competition_date', 'tournament_id', 'ski_jumping_hill_id']}
          items={individualCompetitions}
          itemsKey={'competition_id'}
          del={deleteIndComp}
          update={updateIndComp}
        />
      </Container>
    </>
  );

  const modifyView = () => (
    <Container>
      <IndividualCompetitionForm
        add={addIndComp}
        patch={patchIndComp}
        modifyValue={modElem}
      />
    </Container>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Individual Competitions</h1>
          <Button
            color="info"
            onClick={() => {
              setModElem(null);
              props.history.push(
                props.location.pathname === '/individual-competition'
                  ? '/individual-competition/add'
                  : '/individual-competition'
              );
            }}
          >
            {props.location.pathname === '/individual-competition'
              ? 'Add Individual Competition'
              : 'back to Search'}
          </Button>
        </Container>
        <Switch>
          <Route exact path="/individual-competition" render={searchView} />
          <Route path="/individual-competition/add" render={modifyView} />
          <Route path="/individual-competition/modify" render={modifyView} />
          <Route
            path="/individual-competition/:id"
            render={() => <IndividualCompetitionDetails />}
          />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(IndividualCompetition);
