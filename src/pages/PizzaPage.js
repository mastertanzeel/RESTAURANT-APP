
import React, { useState, useEffect, useCallback } from 'react';
import { useMutation } from 'react-apollo';
// UI
import {
    DropTitle,
    RadioGroup,
    Section,
    Tabs,
    CheckGroup,
    HotBar
} from '../components/UI';

// Data
import { usePizzas, useToppings } from '../hooks';

// Graphql
import { CALCULATE_SINGLE_PIZZA } from '../graphql/mutations';

// Assets
import ToppingsIcon from '../assets/icons/toppings';
import DivisionIcon from '../assets/icons/division';
import { Button } from '../components/UI';

// Constants
const sizes = [
    { label: '9"', value: 'small' },
    { label: '12"', value: 'medium' },
    { label: '15"', value: 'large' }
]

const PizzaPage = (props) => {
    // --------------------
    // Data
    // --------------------
    const [calculateSinglePizza] = useMutation(CALCULATE_SINGLE_PIZZA);

    // Size selector
    const [size, setSize] = useState('large');

    // Topping selections
    const [customToppings, setCustomToppings] = useState(false);
    const [toppingsSelectionSide1, setToppingSelectionSide1] = useState([]);
    const [toppingsSelectionSide2, setToppingSelectionSide2] = useState([]);

    // Pizza division
    const [dividePizza, setDividePizza] = useState(false);

    // Data
    const { pizzas, loading: pizzasLoading } = usePizzas();
    const { toppings, loading: toppingsLoading } = useToppings();

    // Current pizza
    const pizzaSlug = props.match.params.slug;
    const pizza = pizzas.find(pizza => pizza.slug === pizzaSlug);
    // TODO: Init price from pizza.price[size]
    const [price, setPrice] = useState(0);

    // -------------------- 
    // Effects
    // --------------------

    // Fill toppings with selected pizzas toppings
    useEffect(() => {
        const defaultToppings = pizza?.toppings.map(topping => ({ toppingId: topping.topping.id, amount: topping.amount }));
        setToppingSelectionSide1(defaultToppings);
        setToppingSelectionSide2(defaultToppings);
    }, [pizza])

    const handlePizzaPrice = useCallback(async () => {
        try {
            let input = {
                size,
                id: pizza.id,
                isDivided: dividePizza === 1,
                toppingsSelectionSide1,
                toppingsSelectionSide2
            }
            const { data } = await calculateSinglePizza({ variables: { input } });
            setPrice(data.calculateSinglePizza.price);
        } catch (err) {
            // TODO
            console.log('err', err)
        }
    }, [calculateSinglePizza, dividePizza, pizza, toppingsSelectionSide1, toppingsSelectionSide2, size, setPrice]);

    useEffect(() => {
        handlePizzaPrice();
    }, [handlePizzaPrice]);

    // -------------------- 
    // Actions
    // --------------------

    const toggleToppings = () => {
        setCustomToppings(!customToppings);
    };

    const toggleDivision = () => {
        setDividePizza(dividePizza ? 0 : 1);
        if (!customToppings) {
            setCustomToppings(true);
        }
    }

    const handlePizzaChange = (slug) => {
        props.history.push({
            pathname: `/pizza/${slug}`,
        })
    }

    const selectTopping = val => {
        const setTopping = (dividePizza === 2) ? setToppingSelectionSide2 : setToppingSelectionSide1;
        const currentSide = (dividePizza === 2) ? toppingsSelectionSide2 : toppingsSelectionSide1;

        if (currentSide.map(value => value.toppingId).includes(val)) {
            setTopping(currentSide.filter(topping => topping.toppingId !== val));
        } else {
            setTopping([...currentSide, { toppingId: val, amount: 1 }])
        }
    }

    const selectToppingAmount = val => {
        const setTopping = (dividePizza === 2) ? setToppingSelectionSide2 : setToppingSelectionSide1;
        const currentSide = (dividePizza === 2) ? toppingsSelectionSide2 : toppingsSelectionSide1;

        const currentTopping = currentSide.find(topping => topping.toppingId === val);
        if (currentTopping) {
            setTopping([...currentSide.filter(topping => topping.toppingId !== val), { toppingId: val, amount: (currentTopping.amount > 1 ? 1 : 2) }]);
        } else {
            setTopping([...currentSide, { toppingId: val, amount: 2 }])
        }
    }

    // Ordering
    const addToCart = () => {
        // TODO: submit order
        console.log('size', size);
        console.log('customToppings', customToppings);
        console.log('toppingsSelectionSide1', toppingsSelectionSide1);
        console.log('toppingsSelectionSide2', toppingsSelectionSide2);
        console.log('dividePizza', dividePizza);
        console.log('price', price);
        console.log('adding to cart');
    }

    return (
        <main>
            <Section wide>
                {/* Dropdown title */}
                <DropTitle
                    title={pizza?.name?.is}
                    options={pizzas.map(pizza => ({
                        value: pizza?.slug,
                        label: pizza?.name?.is
                    }))}
                    value={pizzaSlug}
                    onChange={handlePizzaChange}
                />

                {/* Sizes */}
                <RadioGroup
                    options={sizes}
                    active={size}
                    setActive={setSize}
                />
                {/* Tools */}
                <Button
                    onClick={e => toggleToppings()}
                    active={customToppings}
                    icon={<ToppingsIcon color={customToppings ? '#fff' : '#b51430'} />}
                >
                    Álegg
                </Button>

                <Button
                    onClick={e => toggleDivision()}
                    active={dividePizza}
                    icon={<DivisionIcon color={dividePizza ? '#fff' : '#b51430'} />}
                >
                    Skipta
                </Button>

                {/* Half selection */}
                {
                    !!dividePizza &&
                    <Tabs
                        options={[
                            { value: 1, label: 'Helmingur 1' },
                            { value: 2, label: 'Helmingur 2' }
                        ]}
                        active={dividePizza}
                        setActive={setDividePizza}
                    />
                }
            </Section>


            {/* Topping selections */}
            {
                customToppings &&
                <Section wide title={dividePizza ? `Álegg - #${dividePizza} helmingur` : 'Álegg'}>
                    {!!toppings && toppings.map(toppingGroup =>
                        <CheckGroup
                            title={toppingGroup.category.name.is}
                            options={toppingGroup.toppings.map(topping => ({ toppingId: topping.id, label: topping.name.is, secondary: topping.maxAmount > 1 }))}
                            values={dividePizza === 2 ? toppingsSelectionSide2 : toppingsSelectionSide1}
                            toggle={val => selectTopping(val)}
                            secondaryToggle={val => selectToppingAmount(val)}
                            secondaryLabel='2X'
                            valueKey='toppingId'
                        />
                    )}
                </Section>
            }

            <HotBar
                title={'Bæta við'}
                subtitle={`${price} kr.`}
                action={addToCart}
            />
        </main>
    )
}

export default PizzaPage;