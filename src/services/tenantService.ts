export interface TenantSignupPayload {
  tenantName: string;
  adminEmployeeId: string;
  adminPassword: string;
  adminName?: string;
}

export interface TenantSignupResponse {
  tenantId: number;
  staffId: number;
}

export async function createTenant(payload: TenantSignupPayload): Promise<TenantSignupResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL; 
  const res = await fetch(`${baseUrl}/tenant/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Signup failed');
  }
  return res.json();
}
