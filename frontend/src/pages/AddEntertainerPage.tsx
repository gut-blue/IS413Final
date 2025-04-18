// src/pages/AddEntertainerPage.tsx

import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addEntertainer } from '../api/EntertainerAPI';
import type { FullEntertainer } from '../types/FullEntertainer';

export default function AddEntertainerPage() {
  const nav = useNavigate();

  // initialize an “empty” entertainer (omit the ID; the server will assign it)
  const [ent, setEnt] = useState<Partial<FullEntertainer>>({
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: '', // YYYY-MM-DD
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnt((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // send all fields (Partial<FullEntertainer> is OK)
    await addEntertainer(ent);
    nav('/entertainers');
  };

  return (
    <Container className="my-5">
      <h1>Add Entertainer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Stage Name</Form.Label>
          <Form.Control name="entStageName" value={ent.entStageName ?? ''} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>SSN</Form.Label>
          <Form.Control name="entSSN" value={ent.entSSN ?? ''} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Street Address</Form.Label>
          <Form.Control name="entStreetAddress" value={ent.entStreetAddress ?? ''} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control name="entCity" value={ent.entCity ?? ''} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control name="entState" value={ent.entState ?? ''} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control name="entZipCode" value={ent.entZipCode ?? ''} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control name="entPhoneNumber" value={ent.entPhoneNumber ?? ''} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control name="entWebPage" value={ent.entWebPage ?? ''} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="entEMailAddress"
            type="email"
            value={ent.entEMailAddress ?? ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date Entered</Form.Label>
          <Form.Control
            name="dateEntered"
            type="date"
            value={ent.dateEntered ?? ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" className="me-2">
          Add Entertainer
        </Button>
        <Button variant="secondary" onClick={() => nav('/entertainers')}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
}
