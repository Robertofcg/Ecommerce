import React from 'react';

function ProductCard({ imgSrc, title, price, discountPrice }) {
    return (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-lg-five mb-4">
            <figure className="card card-product-grid h-100">
                <div className="img-wrap rounded bg-light">
                    <span className="topbar">
                        <span className="badge tag-discount">-20%</span>
                    </span>
                    <img className="mix-blend-mode" src={imgSrc} alt={title} />
                </div>
                <figcaption className="card-product-info m-3">
                    <a href="/" className="title">{title}</a>
                    <div className="price-wrap">
                        <span className="price">${price}</span>
                        <del className="discount-price">${discountPrice}</del>
                    </div>
                </figcaption>
                <footer className="card-footer">
                    <button className="btn btn-lg btn-outline-danger w-100 mt-2 agregarCarrito">Agregar a carrito</button>
                </footer>

            </figure>
        </div>
    );
}

function ProductList() {
    return (
        <div className="container mt-4 app-container">
            <div className="row">
                <ProductCard
                    imgSrc="https://res.cloudinary.com/postedin/image/upload/v1/a97433f3-e53e-494e-9492-ec78cc570aad/webpnet-resizeimage-5"
                    title="Lámpara de Techo Industrial"
                    price="39.99"
                    discountPrice="49.99"
                />
                <ProductCard
                    imgSrc="https://cdn1.coppel.com/images/catalog/mkp/701/3000/7012281-1.jpg"
                    title="Lámpara de Pie Moderna"
                    price="49.99"
                    discountPrice="59.99"
                />
                <ProductCard
                    imgSrc="https://calux.com.mx/1901-large_default/h5010-s.jpg"
                    title="Lámpara de Pared Decorativa"
                    price="29.99"
                    discountPrice="39.99"
                />
                <ProductCard
                    imgSrc="https://wio360.com/wp-content/uploads/2020/06/consejos-iluminacion-fotografia-de-producto.jpg"
                    title="Foco LED de Techo"
                    price="19.99"
                    discountPrice="24.99"
                />
                <ProductCard
                    imgSrc="https://www.steren.com.mx/media/catalog/category/LAM-825_x1.jpg"
                    title="Lámpara de Mesa Clásica"
                    price="34.99"
                    discountPrice="44.99"
                />
            </div>
        </div>
    );
}

export default ProductList;
