import React, { createContext, useContext, useState } from "react";

export const BusinessContext = createContext({
    marketplace: "",
    cuit: "",
    addMarketplace: () => { },
    addCuit: () => { },
});

export const useBusinessContext = () => useContext(BusinessContext);

const BusinessContextProvider = ({ defaultValue = [], children }) => {
    const [marketplace, setMarketplace] = useState("");
    const [cuit, setCuit] = useState("");

    const addMarketplace = (marketplace) => {
        console.log("Adding marketplace", marketplace)
        setMarketplace(marketplace);
    };

    const addCuit = (cuit) => {
        setCuit(cuit);
    };

    return (
        <BusinessContext.Provider
            value={{
                marketplace,
                cuit,
                addMarketplace,
                addCuit,
            }}
        >
            {children}
        </BusinessContext.Provider>
    );
};

export default BusinessContextProvider;