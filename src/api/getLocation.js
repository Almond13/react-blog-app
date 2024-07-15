export const parsePath = (location) => {
    const [ , name, sub, page ] = location
    return { name, sub, page }
}

export const linkPath = (parsed, pageNumber) => {
    return parsed.page !== undefined ? `/${parsed.name}/${parsed.sub}/${pageNumber}` : `/${parsed.name}/${pageNumber}`;
}

export const detailLinkPath = (parsed, pageNumber) => {
    return parsed.name === 'category' ? `/${parsed.name}/${parsed.sub}/post/${pageNumber}` : `/${parsed.name}/post/${pageNumber}`;
}