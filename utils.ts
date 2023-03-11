export function replaceQueryPlaceholders(query: string, params: any[]){
    for(let i = 0; i < params.length; i++){
        const placeholderIndex = query.indexOf('?')
        query = query.slice(0, placeholderIndex) + '$' + (i + 1) + query.slice(placeholderIndex + 1, query.length)
    }
    return query;
}