import axios from 'axios/index';
// import { getUserData } from 'main/content/apps/profiles/store/actions/user.actions';
import * as Fn from 'fn/simpleCall.js';
// import _ from 'lodash';
// import { getTypeaheads } from '../../../typeaheads/store/actions';

export const GET_PROFILES = '[PROFILES APP] GET PROFILES';
export const SET_SEARCH_TEXT = '[PROFILES APP] SET SEARCH TEXT';
export const OPEN_NEW_PROFILE_DIALOG = '[PROFILES APP] OPEN NEW PROFILE DIALOG';
export const CLOSE_NEW_PROFILE_DIALOG = '[PROFILES APP] CLOSE NEW PROFILE DIALOG';
export const OPEN_EDIT_PROFILE_DIALOG = '[PROFILES APP] OPEN EDIT PROFILE DIALOG';
export const CLOSE_EDIT_PROFILE_DIALOG = '[PROFILES APP] CLOSE EDIT PROFILE DIALOG';
export const ADD_PROFILE = '[PROFILES APP] ADD PROFILE';
export const ADDING_PROFILE = '[PROFILES APP] ADDING PROFILE';
export const ERROR_ADDING_PROFILE = '[PROFILES APP] ERROR ADDING PROFILE';
export const UPDATE_PROFILE = '[PROFILES APP] UPDATE PROFILE';
export const REMOVE_PROFILE = '[PROFILES APP] REMOVE PROFILE';
export const RECIEVING_PROFILES = '[PROFILES APP] RECIEVING PROFILES';
export const RESET_ADD_PROFILE = '[PROFILES APP] RESET ADD PROFILE';
export const FETCH_TYPEAHEADS = '[PROFILES APP] FETCH_TYPEAHEADS';

export function getProfiles(routeParams) {
  return dispatch => {
    const request = Fn.simpleCallWA(dispatch, 'get', '/si/leaderboard?limit=100');
    dispatch(recievingProfiles());
    request.then(response =>
      dispatch({
        type: GET_PROFILES,
        payload: response.data,
        routeParams
      })
    );
  };
}

export function getTypeaheads() {
  return async dispatch => {
    try {
      const industries = await Fn.simpleCallWA(dispatch, 'get', 'typeahead/industry');
      const countries = await Fn.simpleCallWA(dispatch, 'get', 'typeahead/country');
      const categories = await Fn.simpleCallWA(dispatch, 'get', 'typeahead/category');
      dispatch({
        type: FETCH_TYPEAHEADS,
        payload: {
          industries: industries.data,
          countries: countries.data,
          categories: categories.data
        }
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

function recievingProfiles() {
  return {
    type: RECIEVING_PROFILES
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function openNewProfileDialog() {
  return {
    type: OPEN_NEW_PROFILE_DIALOG
  };
}

export function closeNewProfileDialog() {
  return {
    type: CLOSE_NEW_PROFILE_DIALOG
  };
}

export function openEditProfileDialog(data) {
  return {
    type: OPEN_EDIT_PROFILE_DIALOG,
    data
  };
}

export function closeEditProfileDialog() {
  return {
    type: CLOSE_EDIT_PROFILE_DIALOG
  };
}

export function resetAddProfile() {
  return {
    type: RESET_ADD_PROFILE
  };
}

export function addProfile(newProfile) {
  return async dispatch => {
    dispatch({ type: ADDING_PROFILE });

    try {
      const response = await Fn.simpleCallWA(dispatch, 'post', 'si/profiles', newProfile);

      dispatch({
        type: ADD_PROFILE,
        message: response.message,
        id: response.data.id
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: ERROR_ADDING_PROFILE });
    }
  };
}

export function updateProfile({ id, ...profile }) {
  const filteredProfile = {};
  for (let key in profile) {
    if (profile[key] !== '') {
      filteredProfile[key] = profile[key];
    }
  }
  return async dispatch => {
    try {
      const response = await Fn.simpleCallWA(dispatch, 'put', `si/profiles/${id}`, filteredProfile);

      dispatch({
        type: UPDATE_PROFILE,
        profile: response.data,
        id
      });

      dispatch({ type: CLOSE_EDIT_PROFILE_DIALOG });
    } catch (e) {
      console.log(e);
    }
  };
}

export function removeProfile(profileId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().profilesApp.profiles;

    const request = axios.post('/api/profiles-app/remove-profile', {
      profileId
    });

    return request
      .then(response =>
        Promise.all([
          dispatch({
            type: REMOVE_PROFILE
          })
        ]).then(() => dispatch(getProfiles(routeParams)))
      )
      .catch(e => {
        console.log('error:', e);
      });
  };
}
