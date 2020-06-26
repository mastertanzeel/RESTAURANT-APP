import React from 'react';

// UI
import {
    ProductNavigation,
    ToolBar,
    Product,
    ProductGrid,
} from '../components/UI';
// Assets
import ShopIcon from '../assets/icons/shop.svg';
import { useDispatch } from "react-redux";
import { addToCart } from '../redux/actions/cart';

// tempassets
import PizzaImage1 from '../assets/temp/classic.png';
import PizzaImage2 from '../assets/temp/calabria.png';

// Hooks
import { useMenuCategories, useMenuItems, usePizzas } from '../hooks'
import { toast } from 'react-toastify';

const CategoryPage = (props) => {
    const category = props.match.params.slug;
    const dispatch = useDispatch();
    const { menuCategories, loading: menuCategoriesLoading } = useMenuCategories();
    const { menuItems, loading: menuItemsLoading } = useMenuItems();
    const { pizzas, loading: pizzasLoading } = usePizzas();

    const selectMenuCategory = (cat) => {
        props.history.push({
            pathname: `/${cat}`,
        });
    }

    // TODO: slugify
    let products;
    if (category === 'pizzas') {
        products = pizzas.map(pizza => ({
            ...pizza,
            prices: [
                { label: '9"', price: pizza.priceSmall },
                { label: '12"', price: pizza.priceMedium },
                { label: '15"', price: pizza.priceLarge }
            ],
            action: () => {
                props.history.push({
                    pathname: `/pizza/${pizza.slug}`,
                })
            }
        }))
    } else {
        products = menuItems.find(menu => menu.category.slug === category)?.items;
    }

    const selectProduct = (product) => {
        toast(`${product.name['is']} hefur verið bætt í körfuna`, { type: 'success' });
        dispatch(addToCart({ ...product, type: 'MenuItem' }));
    }

    return (
        <main>
            {/* ProductNavigation */}
            <ProductNavigation
                paths={[{ label: 'Pizzur', value: 'pizzas' }, ...menuCategories.map(cat => ({ value: cat.slug, label: cat.name.is }))]}
                currentPath={category}
                onChange={selectMenuCategory}
            />
            {/* Toolbar */}
            {
                (category === 'pizzas') ?
                    <ToolBar
                        leftLabel='Skipta í Tvennt'
                        leftAction={e => console.log('skipta i tvennt')}
                        rightLabel={'Velja Sjálf'}
                        rightAction={e => console.log('velja sjálf')}
                    />
                    :
                    <br />
            }
            {/* Productcontainer */}
            <ProductGrid>
                {/* List of products */}
                {
                    products?.map(product =>
                        <Product
                            title={product.name['is']}
                            description={product.description?.is}
                            price={product.price}
                            variantPrices={product.prices}
                            image={product.imageUrl}
                            action={() => product.action ? product.action(product) : selectProduct(product)}
                            icon={ShopIcon}
                        />
                    )
                }
            </ProductGrid>
        </main>
    )
}

export default CategoryPage;