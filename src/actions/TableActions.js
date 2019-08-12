import axios from 'axios';
import _ from "lodash";

import {talksUrl} from '../constants';

import {
    RESULTS_SORTED,
    TALKS_READY,
    UPDATED_SEARCH_TEXT,
    TALK_SELECTED,
    CLEAR_SELECTED_TALK,
    PAGE_CHANGE
} from './types';

export const loadTalks = () => {
    return async (dispatch) => {

        try {
            let talksResponse = await axios.get(talksUrl);
            let talks = talksResponse.data.data;

            const preparedData = _.map(talks, talk => {
                const preparedPost = _.reduce(talk, (acc, value, key) => {
                    const deserializedKey = _.camelCase(key);

                    acc[deserializedKey] = value;
                    return acc;
                }, {});

                return preparedPost;
            });

            dispatch({
                type: TALKS_READY,
                payload: {talks: preparedData}
            });
        } catch (e) {
            console.log("Something went wrong retrieving the talks list...");
        }


    }

};

export const sortDataBy = ({newSortKey}) => {

    return {
        type: RESULTS_SORTED,
        payload: {newSortKey}
    }

};

export const updateSearchValue = ({newSearchText}) => {

    return {
        type: UPDATED_SEARCH_TEXT,
        payload: {newSearchText}
    }
};

export const updateSelectedTalk = ({selectedTalk}) => {

    return {
        type: TALK_SELECTED,
        payload: {selectedTalk}
    }

};

export const clearSelectedTalk = () => {
    return {
        type: CLEAR_SELECTED_TALK
    }
};

export const changePage = ({page, index}) => {
    return {
        type: PAGE_CHANGE,
        payload: {page, index}
    }
};