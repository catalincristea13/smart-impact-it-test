import React, { Component } from 'react';
import { GistBoxComponent } from "./GistBoxComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

/**
 * Create GistResults Component
 */
class GistResultsComponent extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <ul className="paddingData">
                    <Container>
                        <hr/>
                        <Row className={this.props.data.length < 4 ? "justify-content-center" : ""}>
                            {this.props.data.map((gist, index) => {
                                return (
                                    <GistBoxComponent key={index} data={gist} />
                                );
                            })}
                        </Row>
                    </Container>
                </ul>

            </div>
        )
    }
}
export default GistResultsComponent;