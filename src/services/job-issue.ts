export interface JobIssueResponse {
    jobIssueId: number;
    message?: string;
}

export async function createJobIssue(payload: any): Promise<JobIssueResponse> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = `${baseUrl}/job-issue`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to save job issue');
    }

    return res.json();
}

export async function deleteJobIssue(jobIssueNo: string): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = `${baseUrl}/job-issue/${jobIssueNo}`;
    const res = await fetch(url, { method: 'DELETE' });

    if (!res.ok) {
        throw new Error('Failed to delete job issue entry');
    }
}

export async function printJobIssue(jobIssueNo: string): Promise<void> {
    console.log(`Printing job issue receipt for jobIssueNo: ${jobIssueNo}`);
    alert(`Printing job issue receipt for jobIssueNo: ${jobIssueNo}`);
}

export function clearJobIssueForm(setters: Record<string, (value: string) => void>): void {
    Object.values(setters).forEach(setter => setter(''));
}

export function exitPage(): void {
    if (typeof window !== 'undefined') {
        window.close();
    }
}
