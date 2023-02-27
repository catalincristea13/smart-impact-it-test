import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

/**
 * Create UserDetails Component
 */
class UserDetailsComponent extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <ul className="paddingData">
                    <Container>
                        <Row>
                            <Col xs="12" className="text-center">
                                <div className="user_profile">
                                    <a target="_blank" href={this.props.data.html_url}><img src={this.props.data.avatar_url} alt=""/></a>
                                    <div><strong>{this.props.data.name}</strong></div>
                                    <div>
                                        <a target="_blank" href={this.props.data.html_url}>
                                            <i>{this.props.data.login}</i>
                                        </a>
                                    </div>
                                    <div>{this.props.data.bio}</div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </ul>
            </div>
        )
    }
}

export default UserDetailsComponent;