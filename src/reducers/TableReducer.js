import _ from 'lodash';

import {
    RESULTS_SORTED,
    TALKS_READY,
    UPDATED_SEARCH_TEXT,
    TALK_SELECTED,
    CLEAR_SELECTED_TALK,
    PAGE_CHANGE
} from '../actions/types';

import {SORT_STYLE, TALK_SPECS} from '../constants';

const INITIAL_STATE = {
    talks: [],
    displayedTalks: [],
    sortKey: TALK_SPECS.CREATED_AT,
    sortStyle: SORT_STYLE.ASC,
    searchText: '',
    talksReady: false,
    selectedTalk: {},
    currentPage: 1,
    currentIndex: 0
};

const sortPosts = ({talks, sortKey, sortOrder}) => {

    let sortedPosts = _.sortBy(talks, talk => {
        return talk[sortKey];
    });

    if (sortOrder === SORT_STYLE.DESC) {
        _.reverse(sortedPosts);
    }

    return sortedPosts;
};

const filterPosts = ({talks, searchText, sortKey, sortOrder}) => {
    if (!searchText) {
        return sortPosts({talks, sortKey, sortOrder});
    }

    const searchArray = _.split(searchText, ' ');

    let filteredPosts = _.filter(talks, talk => {
        const prunedPost = _.pick(talk, [TALK_SPECS.TYPE, TALK_SPECS.TITLE, TALK_SPECS.FIRST_NAME, TALK_SPECS.LAST_NAME, TALK_SPECS.DESCRIPTION]);

        return _.every(searchArray, (searchEntry) => {
            return !!_.find(prunedPost, (value) => {
                const attemptedNumberConversion = _.toNumber(searchEntry);

                if (!_.isNaN(attemptedNumberConversion) && _.isNumber(attemptedNumberConversion)) {
                    return attemptedNumberConversion === value;
                } else {
                    return _.includes(_.lowerCase(value), _.lowerCase(searchEntry));
                }
            });
        });

    });


    return filteredPosts;
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case TALKS_READY:
            let initialSortedPosts = filterPosts({
                talks: payload.talks,
                searchText: state.searchText,
                sortKey: state.sortKey,
                sortOrder: state.sortStyle
            });

            return {
                ...state,
                talks: payload.talks,
                displayedTalks: initialSortedPosts,
                talksReady: true
            };

        case RESULTS_SORTED:
            const {sortKey, sortStyle, displayedTalks} = state;
            const {newSortKey} = payload;

            let nextSortStyle = SORT_STYLE.ASC;
            if (newSortKey === sortKey) {
                nextSortStyle = sortStyle === SORT_STYLE.ASC ? SORT_STYLE.DESC : SORT_STYLE.ASC;
            }

            let sortedPosts = sortPosts({talks: displayedTalks, sortKey: newSortKey, sortOrder: nextSortStyle});

            return {
                ...state,
                sortKey: newSortKey,
                sortStyle: nextSortStyle,
                displayedTalks: sortedPosts,
                currentPage: 1,
                currentIndex: 0
            };

        case UPDATED_SEARCH_TEXT:
            const {newSearchText} = payload;

            let filteredPosts = filterPosts({
                talks: state.talks,
                searchText: newSearchText,
                sortKey: state.sortKey,
                sortOrder: state.sortStyle
            });

            return {
                ...state,
                searchText: newSearchText,
                displayedTalks: filteredPosts,
                currentPage: 1,
                currentIndex: 0
            };

        case TALK_SELECTED:
            const {selectedTalk} = payload;
            return {...state, selectedTalk};

        case CLEAR_SELECTED_TALK:
            return {...state, selectedTalk: {}};

        case PAGE_CHANGE:
            const {page, index} = payload;
            return {...state, currentPage: page, currentIndex: index};

        default:
            return state;
    }
};