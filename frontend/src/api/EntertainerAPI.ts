// src/api/EntertainerAPI.ts

import type { SummaryEntertainer } from '../types/SummaryEntertainer';
import type { FullEntertainer } from '../types/FullEntertainer';

const BASE = import.meta.env.VITE_API_URL ?? 'https://localhost:5000/Entertainer';

// fetch list of summary DTOs for the table view
export async function fetchEntertainers(): Promise<SummaryEntertainer[]> {
  const res = await fetch(`${BASE}`);
  if (!res.ok) throw new Error('Failed to load entertainers');
  return res.json();
}

// fetch the full Entertainer record (all columns) by id
export async function fetchEntertainerById(id: number): Promise<FullEntertainer> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to load entertainer');
  return res.json();
}

// add a new Entertainer (all fields in the full record)
export async function addEntertainer(e: Partial<FullEntertainer>): Promise<FullEntertainer> {
  const res = await fetch(`${BASE}/AddEntertainer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(e),
  });
  if (!res.ok) throw new Error('Failed to add entertainer');
  return res.json();
}

// edit an existing Entertainer (all fields in the full record)
export async function editEntertainer(id: number, e: Partial<FullEntertainer>): Promise<void> {
  const res = await fetch(`${BASE}/EditEntertainer/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(e),
  });
  if (!res.ok) throw new Error('Failed to edit entertainer');
}

// delete by id
export async function deleteEntertainer(id: number): Promise<void> {
  const res = await fetch(`${BASE}/DeleteEntertainer/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete entertainer');
}
