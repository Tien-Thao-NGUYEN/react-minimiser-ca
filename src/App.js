import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import SourceContainer from './elements/SourceContainer'
import Diagram from './elements/Diagram'
import GeneratedRule from './elements/GeneratedRule'


function App (props) {
  const [generatedRule, setGeneratedRule] = useState([]);//phai su dung Map
  const [configurationSize, setConfigurationSize] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(-1);
  
  const handleCellClick = (indexLine, indexColumn) => {
    console.log("click ", indexLine, indexColumn);
  };

  return (
    <Container>
      <Row>
        
        <Col sm={6} lg={6} xl={6}>
          <SourceContainer 
            setGeneratedRule = {setGeneratedRule}
            setConfigurationSize = {setConfigurationSize}
            setCurrentTime = {setCurrentTime}
            setCurrentPosition = {setCurrentPosition}
          />
        </Col>

        <Col sm={6} lg={6} xl={6}>
          <Container>
            <Row>
              <Col xl={4} style={{backgroundColor: 'orange'}}>
                <GeneratedRule
                  generatedRule = {generatedRule}
                />
              </Col>
              <Col xl={8} style={{backgroundColor: 'cyan'}}>
                 <Diagram
                    rule = {generatedRule}
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
