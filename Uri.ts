export async function fetchText(uri: string) {
    const result = await fetch(uri)
    .then(res => res.text())
    return result;
}

