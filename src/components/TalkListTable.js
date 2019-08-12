import React from 'react';
import {Grid} from 'react-bootstrap';

import _ from 'lodash';
import Octicon from 'react-octicon';

import TitleAndSearch from './TitleAndSearch';
import DataRowHeader from './DataRowHeader';
import Table from './Table';
import TalkPagination from './TalkPagination';

const TalkListTable = ({talksReady, onClickSort, sortStyle, sortStyles, sortKey, talkSpecs, headerSpecs, talkTextTemplates, headerTemplates, calendarStrings, displayedPosts, onClickTalkRow, searchText, onSearchInputChange, pageSize, currentPage, currentIndex, onClickPage}) => {

    const paginatedPosts = _.chunk(displayedPosts, pageSize);
    const currentPageOfPosts = paginatedPosts[currentIndex];

    if (!talksReady) {
        return (
            <div className="text-center">
                <h3 className="table-heading">Loading...</h3>
                <Octicon className="spinner-large" spin name="sync"/>
            </div>
        );
    }

    return (

        <Grid>
            <TitleAndSearch
                searchText={searchText}
                onSearchInputChange={onSearchInputChange}
                headerTemplates={headerTemplates}
                headerSpecs={headerSpecs}
            />

            <DataRowHeader
                onClickSort={onClickSort}
                talkSpecs={talkSpecs}
                sortStyle={sortStyle}
                sortKey={sortKey}
                sortStyles={sortStyles}
                talkTextTemplates={talkTextTemplates}
            />

            <Table
                displayedPosts={currentPageOfPosts}
                calendarStrings={calendarStrings}
                onClickTalkRow={onClickTalkRow}
            />

            <TalkPagination
                totalDisplayPostCount={displayedPosts.length}
                pageSize={pageSize}
                onClickPage={onClickPage}
                currentPage={currentPage}
                currentIndex={currentIndex}
            />
        </Grid>

    );

};


export default TalkListTable;