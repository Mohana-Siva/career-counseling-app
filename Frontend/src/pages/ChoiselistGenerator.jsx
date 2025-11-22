import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner, Alert, Table } from 'react-bootstrap';

// Style component to embed CSS directly, avoiding path errors.
const Style = () => (
  <style>{`
    .choice-list-generator-container {
      font-family: 'Inter', sans-serif;
    }

    .generator-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #e9ecef;
    }

    .form-label {
      font-weight: 500;
    }
  `}</style>
);


function ChoiceListGenerator() {
  const [cutoff, setCutoff] = useState('');
  const [community, setCommunity] = useState('OC');
  const [colleges, setColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // To track if a search has been performed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setColleges([]);
    setSearched(true);

    try {
      const response = await axios.post('http://localhost:5000/api/generate-choice-list', {
        cutoff: parseFloat(cutoff),
        community: community,
      });
      setColleges(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred.');
      console.error("Failed to fetch choice list", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Style />
      <Container className="choice-list-generator-container mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="generator-card">
              <h2 className="text-center mb-4">TNEA Choice List Generator</h2>
              <p className="text-center text-muted mb-4">
                Enter your cutoff and community to get a personalized list of college options based on last year's data.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Cutoff Mark</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="e.g., 192.5"
                        value={cutoff}
                        onChange={(e) => setCutoff(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Community</Form.Label>
                      <Form.Select value={community} onChange={(e) => setCommunity(e.target.value)}>
                        <option value="OC">OC</option>
                        <option value="BC">BC</option>
                        <option value="BCM">BCM</option>
                        <option value="MBC">MBC</option>
                        <option value="SC">SC</option>
                        <option value="SCA">SCA</option>
                        <option value="ST">ST</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Generate List'}
                  </Button>
                </div>
              </Form>
            </div>

            <div className="results-section mt-4">
              {isLoading && <div className="text-center"><Spinner animation="grow" /></div>}
              {error && <Alert variant="danger">{error}</Alert>}
              {searched && !isLoading && colleges.length === 0 && !error && (
                <Alert variant="info">No colleges found matching your criteria. Try adjusting your cutoff mark.</Alert>
              )}
              {colleges.length > 0 && (
                <div className="generator-card">
                  <h3 className="mb-3">Your Recommended Choices</h3>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>NIRF Rank</th>
                        <th>College Name & Code</th>
                        <th>Branch</th>
                        <th>Last Year's Cutoff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {colleges.map((college) => (
                        <tr key={college._id}>
                          <td>{college.nirfRank === 999 ? 'Not Ranked' : college.nirfRank}</td>
                          <td>{college.collegeName} ({college.tneaCode})</td>
                          <td>{college.branchName}</td>
                          <td>{college.lastYearCutoff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChoiceListGenerator;

