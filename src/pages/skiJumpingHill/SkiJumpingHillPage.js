import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useData from '../../hooks/useData';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Table from '../../components/Table';
import SkiJumpingHillForm from './SkiJumpingHillForm';
import SkiJumpingHillSearchForm from './SkiJumpingHillSearchForm';
import SkiJumpingHillDetails from './SkiJumpingHillDetails';

function SkiJumpingHillPage(props) {
  const [
    skiJumpingHill,
    getSkiJumpingHill,
    addSkiJumpingHill,
    patchSkiJumpingHill,
    deleteSkiJumpingHill,
    message
  ] = useData('ski-jumping-hill');

  const [modElem, setModElem] = useState(null);

  const updateSkiJumpingHill = hill => {
    setModElem(hill);
    props.history.push('/ski-jumping-hill/modify');
  };

  const searchView = () => (
    <>
      <Container>
        <SkiJumpingHillSearchForm get={getSkiJumpingHill} />
      </Container>
      <Container>
        <Table
          info
          route={'ski-jumping-hill'}
          labels={['Name', 'Country', 'City']}
          values={['name', 'country', 'city']}
          items={skiJumpingHill}
          itemsKey={'ski_jumping_hill_id'}
          del={deleteSkiJumpingHill}
          update={updateSkiJumpingHill}
        />
      </Container>
    </>
  );

  const modifyView = () => (
    <Container>
      <SkiJumpingHillForm
        add={addSkiJumpingHill}
        patch={patchSkiJumpingHill}
        modifyValue={modElem}
      />
    </Container>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Ski Jumping Hill</h1>
          <Button
            color="info"
            onClick={() => {
              setModElem(null);
              props.history.push(
                props.location.pathname === '/ski-jumping-hill'
                  ? '/ski-jumping-hill/add'
                  : '/ski-jumping-hill'
              );
            }}
          >
            {props.location.pathname === '/ski-jumping-hill'
              ? 'Add Ski Jumping Hill'
              : 'back to Search'}
          </Button>
        </Container>
        <Switch>
          <Route exact path="/ski-jumping-hill" render={searchView} />
          <Route path="/ski-jumping-hill/add" render={modifyView} />
          <Route path="/ski-jumping-hill/modify" render={modifyView} />
          <Route
            path="/ski-jumping-hill/:id"
            render={() => <SkiJumpingHillDetails />}
          />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(SkiJumpingHillPage);
