'use client';

export interface GoodsInwardPayload {
  inwNo: string;
  date: string;
  customer: string;
  category: string;
  goodsFrom: string;
  labApproved: boolean;
  type: string;
  fabricDetails?: FabricDetail[]; // Optional fabric details
  processDetails?: ProcessDetail[]; // Optional process details
}

export interface FabricDetail {
  color: string;
  greigeGSM: number;
}

export interface ProcessDetail {
  processName: string;
  status: string;
}

export interface GoodsInwardResponse {
  message: string;
  inwId?: string;
}

export async function createGoodsInward(payload: GoodsInwardPayload): Promise<GoodsInwardResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = `${baseUrl}/goods-inward`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to create goods inward entry');
  }

  return res.json();
}
