import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import SourceContainer from './elements/SourceContainer'
import Diagram from './elements/Diagram'
import GeneratedRule from './elements/GeneratedRule'
import TransitionTable from './elements/simulator/TransitionTable'


function App (props) {
  const [generatedRule, setGeneratedRule] = useState(() => new TransitionTable());
  const [configurationSize, setConfigurationSize] = useState(0);
  const [currentTime, setCurrentTime] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(-1);
  
  const handleCellClick = (indexLine, indexColumn) => {
    console.log("click ", indexLine, indexColumn);
  };

  const addInRule = (newLocalConfig, newRes) => {
    if (generatedRule.isDeterminismIfSet(newLocalConfig, newRes)) {
      /*var generatedRuleCopy = generatedRule;*/
      generatedRule.set(newLocalConfig, newRes);
      /*generatedRuleCopy.set(newLocalConfig, newRes);*/
      setGeneratedRule(generatedRule);
    }
    else {
      console.log("not determinism if set ", newLocalConfig, " => ", newRes);
    }
  }

  generatedRule.getTable();

  return (
    <Container>
      <Row>
        
        <Col sm={6} lg={6} xl={6}>
          <SourceContainer 
            addInRule = {addInRule}
            setConfigurationSize = {setConfigurationSize}
            setCurrentTime = {setCurrentTime}
            setCurrentPosition = {setCurrentPosition}
          />
        </Col>

        <Col sm={6} lg={6} xl={6}>
          <Container>
            <Row>
              <Col xl={4} style={{backgroundColor: 'yellow'}}>
                <GeneratedRule
                  generatedRule = {generatedRule}
                />
              </Col>
              <Col xl={8} style={{backgroundColor: 'lightgray'}}>
                 <Diagram
                    transitionTable = {generatedRule}
                    configurationSize = {configurationSize}
                    currentTime = {currentTime}
                    currentPosition = {currentPosition}
                    handleCellClick = {handleCellClick}
                  />
              </Col>
            </Row>
          </Container>
        </Col>

      </Row>
    </Container>
  );
}

export default App;
