async function request(url: string, method: string, body?: any) {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}

export const cronsApi = {
    async getAll() {
        return await request('/api/crons', 'GET');
    },
    async addCron(cron: any) {
        return await request('/api/crons', 'POST', cron);
    },
    async updateCron(cron: any) {
        return await request(`/api/crons/${cron.id}`, 'PUT', cron);
    },
    async removeCron(id: number) {
        return await request(`/api/crons/${id}`, 'DELETE');
    }
};