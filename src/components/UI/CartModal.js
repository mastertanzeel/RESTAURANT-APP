import React from "react";

const SideMenu = ({ onClose }) => {

    return (
        <Cart
            visible={cartVisible}
            toggle={toggleCartVisible}
        />
    )
}