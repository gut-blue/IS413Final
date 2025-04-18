import { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { SummaryEntertainer } from '../types/SummaryEntertainer';
import { fetchEntertainers, deleteEntertainer } from '../api/EntertainerAPI';

export default function EntertainerListPage() {
  const [list, setList] = useState<SummaryEntertainer[]>([]);
  const nav = useNavigate();

  const load = async () => {
    try {
      setList(await fetchEntertainers());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Entertainers</h1>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Stage Name</th>
            <th>Number of Times Booked</th>
            <th>Most Recent Booking</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((ent) => (
            <tr key={ent.entertainerID}>
              <td>{ent.entStageName}</td>
              <td>{ent.bookingCount}</td>
              <td>{ent.lastBooked ? new Date(ent.lastBooked).toLocaleDateString() : '-'}</td>
              <td>
                <Button size="sm" onClick={() => nav(`/entertainers/${ent.entertainerID}`)}>
                  Details
                </Button>{' '}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={async () => {
                    if (confirm('Delete this entertainer?')) {
                      await deleteEntertainer(ent.entertainerID);
                      load();
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={() => nav('/entertainers/add')}>
        Add Entertainer
      </Button>
      <br />
      <br />
      <br />
    </Container>
  );
}
