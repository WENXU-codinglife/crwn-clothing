import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // console.log(category,categoriesMap, categoriesMap[category]);
        setProducts(categoriesMap[category]);
    },[category,categoriesMap]);
    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products?.map((product) => {
                    // console.log('product', product);
                    return <ProductCard key={product.id} product={product} />
                })}
            </div>
        </Fragment>
    )
};

export default Category;