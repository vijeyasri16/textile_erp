export interface JobCompletionResponse {
    jobCompletionId: number;
    message?: string;
}

export async function createJobCompletion(payload: any): Promise<JobCompletionResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = `${baseUrl}/job-completion`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to save job completion');
    }

    return res.json();
}

export async function deleteJobCompletion(jobCompletionNo: string): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = `${baseUrl}/job-completion/${jobCompletionNo}`;
    const res = await fetch(url, { method: 'DELETE' });

    if (!res.ok) {
        throw new Error('Failed to delete job completion entry');
    }
}

export async function printJobCompletion(jobCompletionNo: string): Promise<void> {
    console.log(`Printing job completion receipt for jobCompletionNo: ${jobCompletionNo}`);
    alert(`Printing job completion receipt for jobCompletionNo: ${jobCompletionNo}`);
}

export function clearJobCompletionForm(setters: Record<string, (value: string) => void>): void {
    Object.values(setters).forEach(setter => setter(''));
}

export function exitPage(): void {
    if (typeof window !== 'undefined') {
        window.close();
    }
}
