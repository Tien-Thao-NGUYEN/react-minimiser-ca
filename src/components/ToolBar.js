import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';


const ToolBar = React.memo(
  function Toolbar (props) {
    const [textSize, setTextSize] = useState('');
  
    const handleSizeInputChange = (event) => {
      setTextSize(event.target.value);
    }
  
    const handleSizeButtonOnClick = (event) => {
      const numericSize = parseInt(textSize, 10);
      props.handleChangeSize(numericSize);
      event.preventDefault();
    }
  
    
    return (
      <Navbar 
        bg = "light" 
        expand = "lg"
      >
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl 
              type = "number" 
              placeholder = "Size" 
              className = "mr-sm-2" 
              onChange = { handleSizeInputChange } 
            />
            <Button 
              variant = "outline-success"
              onClick = { handleSizeButtonOnClick }
            > Set Size </Button>
          </Form>
          <Button
            variant = "outline-success"
            onClick = { props.handleCheckLocalMapping }
          > Check Local Mapping </Button>
          <Button
            variant = "outline-success" 
            onClick = { props.handleUndoClick }
          > Undo </Button>
          <Button
            variant = "outline-success" 
            onClick = { props.handleRedoClick }
          > Redo </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
);

export default ToolBar;