export interface JobCardResponse {
    jobCardId: number;
    message?: string;
  }
  
  
  export async function createJobCard(payload: any): Promise<JobCardResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = `${baseUrl}/job-card`;
  
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Failed to save job card');
    }
  
    return res.json();
  }
  
  export async function deleteJobCard(jobCardNo: string): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = `${baseUrl}/job-card/${jobCardNo}`;
    const res = await fetch(url, { method: 'DELETE' });
  
    if (!res.ok) {
      throw new Error('Failed to delete job card entry');
    }
  }
  
  export async function printJobCard(jobCardNo: string): Promise<void> {
    // Simulating print functionality
    console.log(`Printing job card receipt for jobCardNo: ${jobCardNo}`);
    alert(`Printing job card receipt for jobCardNo: ${jobCardNo}`);
  }
  
  export function clearJobCardForm(setters: Record<string, (value: string) => void>): void {
    Object.values(setters).forEach(setter => setter(''));
  }
  
  export function exitPage(): void {
    if (typeof window !== 'undefined') {
      window.close();
    }
  }
  