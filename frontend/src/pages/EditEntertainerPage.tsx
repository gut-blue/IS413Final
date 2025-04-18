// src/pages/EditEntertainerPage.tsx

import { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEntertainerById, editEntertainer } from '../api/EntertainerAPI';
import type { FullEntertainer } from '../types/FullEntertainer';

export default function EditEntertainerPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [ent, setEnt] = useState<FullEntertainer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchEntertainerById(+id)
      .then((data) => setEnt(data))
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnt({ ...ent, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editEntertainer(ent.entertainerID, ent);
    nav(`/entertainers/${ent.entertainerID}`);
  };

  return (
    <Container className="my-5">
      <h1>Edit Entertainer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Stage Name</Form.Label>
          <Form.Control name="entStageName" value={ent.entStageName} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>SSN</Form.Label>
          <Form.Control name="entSSN" value={ent.entSSN} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Street Address</Form.Label>
          <Form.Control name="entStreetAddress" value={ent.entStreetAddress} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control name="entCity" value={ent.entCity} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control name="entState" value={ent.entState} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control name="entZipCode" value={ent.entZipCode} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control name="entPhoneNumber" value={ent.entPhoneNumber} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control name="entWebPage" value={ent.entWebPage} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="entEMailAddress"
            type="email"
            value={ent.entEMailAddress}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date Entered</Form.Label>
          <Form.Control
            name="dateEntered"
            type="date"
            value={ent.dateEntered.split('T')[0]}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" className="me-2">
          Save
        </Button>
        <Button variant="secondary" onClick={() => nav(-1)}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
}
