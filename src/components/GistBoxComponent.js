import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Row from "react-bootstrap/Row";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ForkComponent } from "./ForkComponent";

/**
 * Create GistBox Component
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
export const GistBoxComponent = (data) => {
    /**
     * Define constants and use state hooks
     */
    const gistboxData = data.data;
    const files = gistboxData.files;
    console.log("filesss:",files);
    const forksUrl = gistboxData.forks_url;
    const noOfFiles = Object.keys(files).length;
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState("");
    const [syntax_lang, setSyntaxLang] = useState("");

    /**
     * Handle modal close
     */
    const handleClose = () => setShowModal(false);

    /**
     * Handel show modal and add data to content
     * @param url
     * @param lang
     * @returns {Promise<void>}
     */
    const handleShow = async (url, lang) => {
        if (url !== "") {
            try {
                const res = await fetch(url);
                const dataModal = await res.text();
                setShowModal(true);
                setDataModal(dataModal);
                lang = lang.toLowerCase();
                setSyntaxLang(lang);
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <SyntaxHighlighter language={syntax_lang} style={dark}>
                        {dataModal}
                    </SyntaxHighlighter>
                </Modal.Body>
            </Modal>
            <Col  xs={4} className="gist_box_col">
                <Card className="gist_box">
                    <Card.Body>
                        <Card.Title className="hide_large_text">
                            <a className="gist_link" target="_blank" href={gistboxData.html_url}>{gistboxData.description ? gistboxData.description : Object.values(files)[0].filename }</a>
                        </Card.Title>
                        <p className="numberFiles">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-file-earmark-code" viewBox="0 0 16 16">
                                <path
                                    d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                <path
                                    d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z"/>
                            </svg>
                            &nbsp;{noOfFiles} <span>{noOfFiles > 1 ? "Files" : "File"}</span>
                        </p>
                        {Object.keys(files).map((file, i) => (
                            <div key={i}>
                                <Row onClick={() => handleShow(files[file].raw_url, files[file].language)}>
                                    <Col xs={7}>
                                        <span className="filename">{file}</span>
                                    </Col>
                                    <Col xs={5} className="badge_col">
                                        <Badge bg="info" >
                                            {files[file].language}
                                        </Badge>
                                    </Col>
                                    <div>{new Date(gistboxData.created_at).toISOString().substring(0, 10)}</div>
                                </Row>
                                <br/>
                            </div>
                        ))}
                        <ForkComponent data={forksUrl}/>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};