export interface DeliveryResponse {
  deliveryId: number;
  message?: string;
}

export async function createDelivery(payload: any): Promise<DeliveryResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = `${baseUrl}/delivery`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to save delivery');
  }

  return res.json();
}

export async function deleteDelivery(deliveryNo: string): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = `${baseUrl}/delivery/${deliveryNo}`;
  const res = await fetch(url, { method: 'DELETE' });

  if (!res.ok) {
    throw new Error('Failed to delete delivery entry');
  }
}

export async function printDelivery(deliveryNo: string): Promise<void> {
  // Simulating print functionality (In a real-world scenario, you'd trigger a print request)
  console.log(`Printing delivery receipt for deliveryNo: ${deliveryNo}`);
  alert(`Printing delivery receipt for deliveryNo: ${deliveryNo}`);
}

export function clearDeliveryForm(setters: Record<string, (value: string) => void>): void {
  Object.values(setters).forEach(setter => setter(''));
}

export function exitPage(): void {
  if (typeof window !== 'undefined') {
    window.close();
  }
}
