const API = process.env.OPTIMIZELY_API_URL!;

export async function getStartPage() {
    console.log('`${API}/site`', `${API}/site`)
    const res = await fetch(`${API}/site`, { next: { revalidate: 60 } });
    const data = await res.json();
    console.log('data', data)

    const startPageId = data[0].contentRoots.startPage.id;
    
    return getContentById(startPageId);
}

export async function getContentById(id: number) {
    const res = await fetch(`${API}/content/${id}`, {
        next: { revalidate: 60 },
    });

    return res.json();
}

export async function getContentByUrl(url: string) {
    const res = await fetch(`${API}/content?url=${encodeURIComponent(url)}`, {
        next: { revalidate: 60 },
    });

    const data = await res.json();

    return data?.[0] ?? null;
}