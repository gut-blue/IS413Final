import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { fetchEntertainerById } from '../api/EntertainerAPI';
import type { FullEntertainer } from '../types/FullEntertainer';

export default function EntertainerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [ent, setEnt] = useState<FullEntertainer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchEntertainerById(+id)
      .then(setEnt)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!ent) {
    return (
      <Container className="text-center my-5">
        <p>Entertainer not found.</p>
        <Button onClick={() => nav('/entertainers')}>Back to List</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Header as="h2">{ent.entStageName}</Card.Header>
        <Card.Body>
          <dl className="row">
            <dt className="col-sm-3">SSN</dt>
            <dd className="col-sm-9">{ent.entSSN}</dd>

            <dt className="col-sm-3">Address</dt>
            <dd className="col-sm-9">
              {ent.entStreetAddress}, {ent.entCity}, {ent.entState} {ent.entZipCode}
            </dd>

            <dt className="col-sm-3">Phone</dt>
            <dd className="col-sm-9">{ent.entPhoneNumber}</dd>

            <dt className="col-sm-3">Website</dt>
            <dd className="col-sm-9">{ent.entWebPage}</dd>

            <dt className="col-sm-3">Email</dt>
            <dd className="col-sm-9">{ent.entEMailAddress}</dd>

            <dt className="col-sm-3">Date Entered</dt>
            <dd className="col-sm-9">{new Date(ent.dateEntered).toLocaleDateString()}</dd>
          </dl>

          <div className="mt-4">
            <Button
              variant="primary"
              onClick={() => nav(`/entertainers/${ent.entertainerID}/edit`)}
              className="me-2"
            >
              Edit
            </Button>
            <Button variant="secondary" onClick={() => nav('/entertainers')}>
              Back to List
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
