import _ from "lodash";

import {fetchTalks} from '../services/talkService';

import {
    RESULTS_SORTED,
    TALKS_READY,
    TALKS_LOADING,
    UPDATED_SEARCH_TEXT,
    TALK_SELECTED,
    CLEAR_SELECTED_TALK,
    PAGE_CHANGE
} from './types';

export const loadTalks = () => {
    return async (dispatch) => {

        dispatch({
            type: TALKS_LOADING
        });

        try {
            let talksResponse = await fetchTalks();
            let talks = talksResponse.data;

            const preparedData = _(talks)
                .map((talk, index) => {
                    const preparedPost = _.reduce(talk, (acc, value, key) => {
                        const deserializedKey = _.camelCase(key);

                        acc[deserializedKey] = value;
                        return acc;
                    }, {});

                    return preparedPost;
                })
                .valueOf();

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