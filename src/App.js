import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SourceContainer from './components/SourceContainer';
import TargetContainer from './components/TargetContainer';
import TransitionTable from './simulator/TransitionTable';

function App (props) {
  const [genRule, setGenRule] = useState(() => new TransitionTable());
  const [currentSize, setCurrentSize] = useState(0);
  const [currentTime, setCurrentTime] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(-1);

  const updateGenRule = (flag, lc, res) => {
    if (flag === true) {
      var newGenRule = genRule;
        newGenRule.set(lc, res);

      setGenRule(newGenRule);
    }
  }


  return (
    <Container style={{height: '100vh'}}>
      <Row>
        <Col sm={6} lg={6} xl={6}>
          <SourceContainer
            updateGenRule = { updateGenRule } 
            setCurrentSize = { setCurrentSize }
            setCurrentTime = { setCurrentTime }
            setCurrentPosition = { setCurrentPosition }
          />
        </Col>
        <Col sm={6} lg={6} xl={6}>
          <Col>
            <TargetContainer 
              genRule = { genRule }
              currentSize = { currentSize }
              currentTime = { currentTime }
              currentPosition = { currentPosition } 
            />
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
