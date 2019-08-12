import React from 'react';
import {Row, Col, FormControl} from 'react-bootstrap';

const TitleAndSearch = ({searchText, onSearchInputChange, headerSpecs, headerTemplates}) => {

    return (
        <Row>
            <Col className={'table-heading col-6'}>
                {headerTemplates[headerSpecs.CONFERENCE_TALKS]}
            </Col>

            <Col className="col-6 search-container">
                <FormControl
                    value={searchText}
                    onChange={onSearchInputChange}
                    className="filter-search" type="text"
                    placeholder="Search"
                />
            </Col>
        </Row>
    );

};


export default TitleAndSearch;