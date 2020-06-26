import React, { useState } from "react";
import { useMenuCategories } from "../hooks";
import { Drawer } from "./UI";

import PizzaThrow from '../assets/images/pizza_throw.svg';

const SideMenu = ({ onClose }) => {
    const { menuCategories, loading: menuCategoriesLoading } = useMenuCategories();

    const links = [
        { label: 'Pizzur', path: '/pizzas' },
        ...menuCategories.map(cat => ({ path: `/${cat.slug}`, label: cat.name.is })),
        { label: 'Staðir', path: '/locations' }
    ]

    const switchLang = () => {
        console.log('switching language');
    }

    return (
        <Drawer
            links={links}
            footer={
                <>
                <img src={PizzaThrow} alt="Castello" />
                <b>s. 577 3333</b>
                </>
            }
            action={switchLang}
            actionLabel={'English'}
            onClose={onClose}
        />
    )
}

export default SideMenu;