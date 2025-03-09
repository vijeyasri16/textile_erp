'use client';

export interface GoodsInwardPayload {
  itemNo: string;
  date: string;
  customer: string;
  category: string;
  goodsFrom: string;
  labApproved: string;
  type: string;
  fabricDetails: {
    fabric: string;
    colour: string;
    greigeGSM: string;
    greigeDia: string;
    finishRolls: string;
    weight: string;
    machine: string;
  }[];
  processDetails: { process: string }[];
}

export interface GoodsInwardResponse {
  inwardId: number;
  message?: string;
}

export async function createGoodsInward(payload: GoodsInwardPayload): Promise<GoodsInwardResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = `${baseUrl}/goodsinward`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to save goods inward');
  }

  return res.json();
}
export async function deleteGoodsInward(inwardNo: string): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = `${baseUrl}/goods-inward/${inwardNo}`;
  const res = await fetch(url, { method: 'DELETE' });

  if (!res.ok) {
    throw new Error('Failed to delete goods inward entry');
  }
}
