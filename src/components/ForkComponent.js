import React, { useState, useEffect } from "react";

/**
 * Create Fork Component
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
export const ForkComponent = (data) => {
    const forks_url = data.data;
    console.log("forks_url: ",data);
    const [forksData, setForksData] = useState([]);

    const getForsksData = async (url) => {
        if (typeof url != "undefined") {
            try {
                const res = await fetch(url);
                const data_forks = await res.json();
                setForksData(data_forks);
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        getForsksData(forks_url);
    }, []);

    return (
        <>
            {forksData.length > 0 &&
                <span>Forked by: </span>
            }
            {forksData.map((fork, index) => {
                return (
                    <span>
                        <a href={fork.owner.html_url} target="_blank">{fork.owner.login}</a>
                        {index != forksData.length - 1 && <span> / </span> }
                    </span>
                );

            })}
        </>
    );
};
