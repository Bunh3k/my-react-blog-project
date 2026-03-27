export const BASE_URL = "https://realworld.habsida.net/api";

export async function getArticles(page = 1, limit = 3){
    const offset = (page - 1) * limit;
    const res = await fetch(`${BASE_URL}/articles?limit=${limit}&offset=${offset}`)

    if(!res.ok){
        throw new Error('Failed to fetch articles.')
    }

    return res.json()
}

export async function getArticle(slug){
    const res = await fetch(`${BASE_URL}/articles/${slug}`);

    if(!res.ok){
        throw new Error('Failed to fetch article.')
    }

    return res.json()
}

export async function loginUser({email, password}){
    const res = await fetch(`${BASE_URL}/users/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {email, password}
        })
    })

    const data = res.json()

    if(!res.ok){
        throw new Error("Username or password is wrong")
    }
    return data
}

export async function registerUser({username, email, password}){
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {username, email, password}
        })
    })

    const data = res.json()

    if(!res.ok){
        throw data
    }
    return data;
}