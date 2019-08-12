import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import ColumnHeader from './ColumnHeader';

const DataRowHeader = ({onClickSort, talkSpecs, talkTextTemplates, sortKey, sortStyle, sortStyles}) => {

    const {talkDetail} = talkTextTemplates;

    return (
        <Row className={'talk-row header-row'}>
            <Col className={'col-md-2'}>
                <Button
                    onClick={() => {
                        onClickSort(talkSpecs.TYPE)
                    }}
                    className={'table-header-title'}
                >

                    <ColumnHeader
                        columnName={talkSpecs.TYPE}
                        headerText={talkDetail[talkSpecs.TYPE]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>

            <Col className={'col-md-4'}>
                <Button
                    onClick={() => {
                        onClickSort(talkSpecs.TITLE)
                    }}
                    className={'table-header-title'}
                >
                    <ColumnHeader
                        columnName={talkSpecs.TITLE}
                        headerText={talkDetail[talkSpecs.TITLE]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>

            <Col className={'col-md-2'}>
                <Button
                    onClick={() => {
                        onClickSort(talkSpecs.LAST_NAME)
                    }}
                    className={'table-header-title'}
                >
                    <ColumnHeader
                        columnName={talkSpecs.PRESENTOR}
                        headerText={talkDetail[talkSpecs.PRESENTOR]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>

            <Col className={'col-md-4'}>
                <Button
                    onClick={() => {
                        onClickSort(talkSpecs.DESCRIPTION)
                    }}

                    className={'table-header-title'}
                >
                    <ColumnHeader
                        columnName={talkSpecs.DESCRIPTION}
                        headerText={talkDetail[talkSpecs.DESCRIPTION]}
                        sortStyle={sortStyle}
                        sortKey={sortKey}
                        sortStyles={sortStyles}
                    />
                </Button>
            </Col>
        </Row>
    );

};


export default DataRowHeader;