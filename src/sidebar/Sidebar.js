import { Form, Card, Button } from 'react-bootstrap';
import './Sidebar.css'

const Sidebar= ({ startDate, endDate, handleChange, handleClearFilter, filterapplied }) => {
  
  return (
    <>
      <Card className='cont bg-dark text-light'>
        <Card.Body >
          <Form >  
            <h3>Search Data through dates</h3>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" value={startDate} onChange={handleChange} />
            </Form.Group> 
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" value={endDate} onChange={handleChange} />
            </Form.Group>
            <br/>
            {filterapplied &&  (
              <Button className='btn' onClick={handleClearFilter}>Clear Date</Button>           
            )}
          </Form>
        </Card.Body>
      </Card> 
    </>
  );
};
export default Sidebar;