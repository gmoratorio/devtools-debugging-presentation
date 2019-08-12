import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Grid, Row, Col, Thumbnail, Button, Image} from 'react-bootstrap';

import _ from 'lodash';

import {clearSelectedTalk} from '../actions';
import {talks} from '../locale.en';
import fallbackImage from '../assets/image_unavailable.jpg';

const {talkDetail} = talks;

class TalkDetail extends Component {

    handleImageError = (event) => {
        event.target.setAttribute('src', fallbackImage);
    };

    onClickBack = () => {
        this.props.clearSelectedTalk();
    };

    renderDetail() {
        const {selectedTalk} = this.props;

        const {type, title, firstName, lastName, description, profilePhotoUrl} = selectedTalk;

        const presentorName = `${firstName} ${lastName}`;

        return (
            <Grid>
                <Row>
                    <Col className="col-12">
                        <h2>{title}</h2>

                        <Thumbnail className="thumbnail-main">
                            <Image src={profilePhotoUrl} responsive className="thumbnail" onError={this.handleImageError}/>
                            <h4>{`${talkDetail[type]} by ${presentorName}`}</h4>
                        </Thumbnail>
                        <p className={'description'}>{description}</p>

                        <p className={"back-to-list"}>
                            <Button bsStyle="primary" onClick={this.onClickBack}>
                                <Link to="/" className="back-button">
                                    Back to List
                                </Link>
                            </Button>
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }

    render() {
        if (_.isEmpty(this.props.selectedTalk)) {
            return (<Redirect to="/"/>)
        }

        return (
            <div className="container details-main-container">
                {this.renderDetail()}
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    const {windowWidth, windowHeight} = state.bootstrap;
    const {selectedTalk} = state.table;

    return {windowWidth, windowHeight, selectedTalk};
};


export default connect(mapStateToProps, {clearSelectedTalk})(TalkDetail);

