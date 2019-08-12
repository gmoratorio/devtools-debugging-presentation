import React from 'react';
import {Grid} from 'react-bootstrap';

import _ from 'lodash';
import Octicon from 'react-octicon';

import TitleAndSearch from './TitleAndSearch';
import DataRowHeader from './DataRowHeader';
import Table from './Table';
import TalkPagination from './TalkPagination';

const TalkListTable = ({talksReady, onClickSort, sortStyle, sortStyles, sortKey, talkSpecs, headerSpecs, talkTextTemplates, headerTemplates, calendarStrings, displayedTalks, onClickTalkRow, searchText, onSearchInputChange, pageSize, currentPage, currentIndex, onClickPage}) => {

    const paginatedPosts = _.chunk(displayedTalks, pageSize);
    const currentPageOfTalks = paginatedPosts[currentIndex];

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
                displayedTalks={currentPageOfTalks}
                calendarStrings={calendarStrings}
                onClickTalkRow={onClickTalkRow}
            />

            <TalkPagination
                totalDisplayPostCount={displayedTalks.length}
                pageSize={pageSize}
                onClickPage={onClickPage}
                currentPage={currentPage}
                currentIndex={currentIndex}
            />
        </Grid>

    );

};


export default TalkListTable;