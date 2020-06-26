import React from 'react';
import { Section, List } from '../components/UI';
import { useMenuCategories } from '../hooks';

// Assets
import arrRight from '../assets/icons/arrow_right.svg';

const OverviewPage = () => {
    const { menuCategories, loading: menuCategoriesLoading } = useMenuCategories();

    const links = [
        { label: 'Tilboð', path: '/offers' },
        { label: 'Pizzur', path: '/pizzas' },
        ...menuCategories.map(cat => ({ path: `/${cat.slug}`, label: cat.name.is })),
    ]

    return (
        <main>
            <Section title={'Hvað langar þig í?'}>
                <List items={links} listIcon={arrRight} />
            </Section>
        </main>
    )
}

export default OverviewPage;