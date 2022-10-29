import Container from 'react-bootstrap/Container';
import { Navbar, Image, Form, Button, FormGroup, FormControl, Row, Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect, useMemo  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Capsule from './Components/Capsule.js';
import Pagination from './Components/Pagination.js';

let PageSize = 10;

const App = ({ match }) => {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Store URL 
  const url = 'https://api.spacexdata.com/v3/capsules';

  useEffect(() => {
    getAllCapsulteData();
    }, []);

  // Get data from API
  const getAllCapsulteData = () => {
    axios.get(`${url}`)
    .then((response) => {
        const allData = response.data;
        setCapsules(allData);
    })
    .catch(error => console.error(`Error: ${error}`));
  }

  // Submit handler for search
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
    e.target.reset();
  };
  
  // Filter capsule based on the search keyword
  const filtered = capsules.filter((capsule) => {
      return capsule.status === keyword || capsule.capsule_id === keyword
      || capsule.original_launch === keyword
     })
  
  // If the search is done, result will store the searched result or
  // it will store the whole capsules array
  const res = filtered.length > 0 ? filtered : capsules;

  // currentTableData stores the array of elements based on the current page
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return res.slice(firstPageIndex, lastPageIndex);
  }, [currentPage,res]);

  let len = capsules.length; 
  const random = Math.floor(Math.random() * len); 

  return (
    <div className="App">
      <header>
      <Navbar className="App-header">
        <Container>
          <Navbar.Brand className="brand" href="/"><h4 className="white">SpaceX</h4></Navbar.Brand>
        </Container>
      </Navbar>
      
      </header>
      <Row className="banner">
        <Col className="title">
          <h1 className="d-flex flex-column justify-content-start tagline yellow">{capsules.length > 0 ? capsules[random].type : " "}</h1>
          <h3 className="d-inline-flex flex-column justify-content-start description">{capsules.length > 0 ? capsules[random].details : " "}</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Image className="img-fluid image" fluid src="https://images.wsj.net/im-38132?width=1280&size=1.33333333" responsive/>
        </Col>
      </Row>
      <Row className="d-inline-flex flex-row">
        <h2 className="search yellow">Search Form</h2>
        <Form inline="true" className="d-flex m-auto" onSubmit={submitHandler}>
          <Row>
            <Col>
              <FormGroup className="d-flex row-lg column-sm inputs" controlId="formInlineName">
                <FormControl type="text" 
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Status"/>
              </FormGroup>
           
              <FormGroup className="d-flex row-lg column-sm inputs" controlId="formInlineName">
                <FormControl type="text" 
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Original Launch"/>
              </FormGroup>
           
              <FormGroup className="d-flex row-lg column-sm inputs" controlId="formInlineName">
                <FormControl type="text" 
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Type" />
              </FormGroup>
              </Col>
            <Row>
              <Col>
                <Button className="row-sm submit justify-content-center" type="submit">Submit</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2 className="bold capsules justify-content-center">Capsules</h2>
              </Col>
            </Row>
          </Row>   
        </Form>
      </Row>
      <Row>
      {/*Loop through the capsules based on the search result */}
       { currentTableData
       .map((capsule) => (
        <Col>
          <Capsule key={capsule.capsule_serial} capsule={capsule} />
        </Col>
        ))}
      </Row>
      <Row>
        <Col>
        {/* Paginate the items in the data */}
          <Pagination 
            className="pagination-bar justify-content-center"
            currentPage={currentPage}
            totalCount={res.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
