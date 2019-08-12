import React, {Component} from 'react';
import {connect} from 'react-redux';

import './components.css';
import 'bootstrap/dist/css/bootstrap.css';

import {updateWindowDimensions, sortDataBy, loadTalks, updateSearchValue, updateSelectedTalk, changePage} from '../actions';

import {TALK_SPECS, SORT_STYLE, CALENDAR_STRINGS, PAGE_SIZE, HEADER_STRINGS} from '../constants';
import {talks, headers} from '../locale.en';

import TalkListTable from './TalkListTable';

class DevToolsIndex extends Component {

    componentWillMount() {
        this.props.loadTalks();
    }

    componentDidMount() {
        this.props.updateWindowDimensions();

        window.addEventListener('resize', this.props.updateWindowDimensions);
    }

    onClickSort = (newSortKey) => {
        this.props.sortDataBy({newSortKey});
    };

    onSearchInputChange = (event) => {
        const newSearchText = event.target.value;

        this.props.updateSearchValue({newSearchText});
    };

    onClickTalkRow = (index) => {
        const {displayedTalks, currentIndex} = this.props;
        const trueIndex = (PAGE_SIZE * currentIndex) + index;

        const selectedTalk = displayedTalks[trueIndex];

        this.props.updateSelectedTalk({selectedTalk});
    };

    onClickPage = ({page, index}) =>{
        this.props.changePage({page, index})
    };

    render() {
        const {talksReady, sortStyle, sortKey, displayedTalks, searchText, currentPage, currentIndex} = this.props;

        return (
            <div className="container main-container">
                <h1 className={'text-center main-heading'}>
                    {headers[HEADER_STRINGS.MAIN_HEADER]}
                </h1>

                <TalkListTable
                    talksReady={talksReady}
                    sortStyle={sortStyle}
                    sortKey={sortKey}
                    sortStyles={SORT_STYLE}
                    talkSpecs={TALK_SPECS}
                    headerSpecs={HEADER_STRINGS}
                    onClickSort={this.onClickSort}
                    headerTemplates={headers}
                    talkTextTemplates={talks}
                    calendarStrings={CALENDAR_STRINGS}
                    displayedTalks={displayedTalks}
                    onClickTalkRow={this.onClickTalkRow}
                    searchText={searchText}
                    onSearchInputChange={this.onSearchInputChange}
                    pageSize={PAGE_SIZE}
                    onClickPage={this.onClickPage}
                    currentPage={currentPage}
                    currentIndex={currentIndex}
                />
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {windowWidth, windowHeight} = state.bootstrap;
    const {sortStyle, sortKey, displayedTalks, searchText, talksReady, currentPage, currentIndex} = state.table;

    return {windowWidth, windowHeight, displayedTalks, sortStyle, sortKey, searchText, talksReady, currentPage, currentIndex};
}

export default connect(mapStateToProps, {
    updateWindowDimensions,
    sortDataBy,
    loadTalks,
    updateSearchValue,
    updateSelectedTalk,
    changePage
})(DevToolsIndex);