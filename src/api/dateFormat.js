export const setDetailDate = (data) => {
    const dateObj = new Date(data)
    const options = {year: 'numeric', month: 'long', day: '2-digit'}
    return dateObj.toLocaleDateString('en-US', options)
}

export const setCommentDate = (date) => {
    const [yy, mm, dd] = [date.slice(0,4),date.slice(5,7),date.slice(8,10)]
    return `${yy}년 ${mm}월 ${dd}일`
}