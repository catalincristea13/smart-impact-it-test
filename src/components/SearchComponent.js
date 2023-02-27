import React, { useState } from "react";
import {getGistsForUserUrl, getUserDetailsUrl} from "../config/config_gist_api";
import GistResultsComponent from "./GistResultsComponent";
import UserDetailsComponent from "./UserDetailsComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

/**
 * Create Search Component
 * @returns {JSX.Element}
 * @constructor
 */
export const SearchComponent = () => {
    /**
     * Define timer and use state hooks
     */
    var timer, delay = 1000;
    const [usernameDetails, setUsernameDetails] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    /**
     * Define onsearch action
     * @param username
     * @returns {Promise<void>}
     */
    const onSearch = async (username) => {
        setLoading(true);
        if (username && username !== "") {
            try {
                //Get gists data
                const URL = getGistsForUserUrl(username);
                const res = await fetch(URL);
                const data = await res.json();
                setData(data);

                //Get username details
                const usernameDetailUrl = getUserDetailsUrl(username);
                const resUsernameDetails = await fetch(usernameDetailUrl);
                const dataUsername = await resUsernameDetails.json();
                setUsernameDetails(dataUsername);

                setLoading(false);
                setError(false);
            } catch (e) {
                setLoading(false);
                setError(true);
            }
        } else if (username === "") {
            setLoading(false);
            setError(true);
        }
        setLoading(false);
    };

    /**
     * Handle change of input and set timeout
     * @param e
     */
    const handleChange = (e) => {
        e.preventDefault();
        clearTimeout(timer);
        timer = setTimeout(function() {
            onSearch(e.target.value);
        }, delay );
    };

    return (
        <>
            <br/>
            <Container>
                <Row>
                    <Col xs="12" className="text-center">
                        <Form.Control
                            className="search_user_gist"
                            placeholder="Search here"
                            onChange={handleChange}
                        />
                    </Col>
                    {usernameDetails.message == "Not Found" && loading == false ? (
                        <div>No user found</div>
                    ) : null}
                    {usernameDetails && typeof data != "undefined" && data.length == 0 && loading == false ? (
                        <div>No any public gists found</div>
                    ) : null}
                </Row>
            </Container>
            <br/>
            {usernameDetails !== "" && typeof data != "undefined" && data.length > 0 && !error ? (
                <>
                    <UserDetailsComponent data={usernameDetails}/>
                    <GistResultsComponent data={data}/>
                </>
            ) : null}
        </>
    );
};

export default SearchComponent;