import React from 'react';
import _ from "lodash";

import DataRowLarge from './DataRowLarge';

const Table = ({displayedTalks, calendarStrings, onClickTalkRow}) => {

    return _.map(displayedTalks, (talk, index) => {
        const {type, title, firstName, lastName, description} = talk;

        const shortenedDescription = !!description ? `${description.slice(0, 60)}...` : '';
        const presentorName = !!firstName ? `${firstName.slice(0, 1)}. ${lastName}` : lastName;

        return (
            <DataRowLarge
                key={index}
                index={index}
                type={type}
                title={title}
                presentor={presentorName}
                description={shortenedDescription}
                onClick={onClickTalkRow}
            />
        );
    })

};

export default Table;