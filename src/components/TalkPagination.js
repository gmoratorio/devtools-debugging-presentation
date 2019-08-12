import React from 'react';
import {Row} from 'react-bootstrap';

import _ from 'lodash';

const TalkPagination = ({totalDisplayPostCount, pageSize, currentIndex, currentPage, onClickPage}) => {

    const pageCount = Math.ceil(totalDisplayPostCount / pageSize);

    const renderPaginationItems = () => {

        return _.times(pageCount, index => {
            const page = index + 1;
            return (
                <li className={page === currentPage ? 'page-item active' : 'page-item'} key={page}  ><a className="page-link" onClick={()=>onClickPage({page, index})}>{page}</a></li>
            )
        });
    };

    if(!totalDisplayPostCount){
        return (
            <Row>
                <div className="pagination-center">
                    No Results
                </div>
            </Row>
        );
    }

    return (
        <Row>
            <nav className="pagination-center">
                <ul className="pagination">
                    <li className='page-item' key={'first'}  ><a className="page-link" onClick={()=>onClickPage({page: 1, index: 0})}>First</a></li>
                    {renderPaginationItems()}
                    <li className='page-item' key={'last'}  ><a className="page-link" onClick={()=>onClickPage({page: pageCount, index: (pageCount - 1)})}>Last</a></li>
                </ul>
            </nav>
        </Row>
    );

};




export default TalkPagination;