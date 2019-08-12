import _ from 'lodash';
import axios from 'axios';
import {talksUrl} from '../constants';

export const fetchTalks = () => {
    return axios.get(talksUrl)
        .then(response => {
            let results = response.data.data;

            results.splice(30, 0, {});
            results.splice(39, 0, {});
            results.splice(45, 0, undefined);
            results.splice(50, 0, null);

            response.data.data = _.map(results, result => {
                if (!!result && result.id === 218) {
                    result.first_name = '';
                    result.last_name = '';
                }

                return result;
            });


            return response;
        })
};