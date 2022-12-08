function queryFetch(query) {
    return (fetch('https://api.nosto.com/v1/graphql', {
        method: 'POST',
        headers: {
            "Content-Type": "application/graphql",
            "Authorization": 'Basic ' + btoa(":" + "N7QnHtiseaaAtartB16sQ7jUcNAm0HgsTxTnwTX08GQ85EYShd90zN3qiYiDjVsq")
        },
        body: query
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.data.products.products)
        })
    )
}

queryFetch(`
query {
    products(limit: 50) {
        products {
            name
            price
            listPrice            
            brand
            imageUrl 
            alternateImageUrls 
            url
            scores { 
                week {
                    views 
                    buys
                }
            }
        }
    }
}
`)


