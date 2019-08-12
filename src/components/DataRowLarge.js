import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import {headers} from '../locale.en';

const DataRowLarge = ({index, type, title, presentor, description, onClick}) => {

    return (
        <Link to="/detail" className="data-row disable-link-style">
            <Row className="talk-row" onClick={() => {
                onClick(index)
            }}>
                <Col className="table-text col-sm-2"><span>{headers[type]}</span></Col>
                <Col className="table-text col-sm-4"><span>{title}</span></Col>
                <Col className="table-text col-sm-2"><span>{presentor}</span></Col>
                <Col className="table-text col-sm-4"><span>{description}</span></Col>
            </Row>
        </Link>
    );

};


export default DataRowLarge;