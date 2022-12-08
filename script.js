$(document).ready(function () {
    $(".post-wrapper").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: $(".next"),
        prevArrow: $(".prev"),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

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

            data.data.products.products.forEach((product) => {

                const outsideDiv = document.getElementById('post-wrapper')

                const divMD = document.createElement('div')
                const divForInfo = document.createElement('div')
                const aLink = document.createElement('a')
                const image = document.createElement('img')
                const title = document.createElement('h3')
                const subTitle = document.createElement('h5')
                const price = document.createElement('p')

                title.className = 'font'
                subTitle.className = 'font'
                price.className = 'font'
                aLink.href = product.url
                divMD.className = 'post'
                divForInfo.className = 'post-info'
                image.className = 'slider-image'
                image.loading = 'lazy'
                image.src = product.imageUrl
                image.alt = 'product-photo'

                title.innerText = product.brand
                subTitle.innerText = product.name
                price.innerText = `€ ${priceWithoutZeros(product.price, 2)}`

                divMD.append(aLink)
                aLink.append(image)
                divForInfo.append(title)
                divForInfo.append(subTitle)
                divForInfo.append(price)
                outsideDiv.append(divMD)
                divMD.append(divForInfo)
            })
        })
    )
}

function priceWithoutZeros(num, precision) {
    return num.toFixed(precision).replace(/\.0+$/, '')
}

queryFetch(`
query {
    products(limit: 5) {
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


