
/**
 * Define endpoint api github
 * @type {string}
 */
const BASE_URL_GITHUB = "https://api.github.com";

/**
 * Define endpoint for getting all gists
 * @param username
 * @returns {string}
 */
const getGistsForUserUrl = (username) => {
    return `${BASE_URL_GITHUB}/users/${username}/gists`;
};

/**
 * Define endpoint for getting user details
 * @param username
 * @returns {string}
 */
const getUserDetailsUrl = (username) => {
    return `${BASE_URL_GITHUB}/users/${username}`;
};

/**
 * Define endpoint for getting gist details
 * @param gistId
 * @returns {string}
 */
const getSingleGistUrl = (gistId) => {
    return `${BASE_URL_GITHUB}/gists${gistId}`;
};

export {getGistsForUserUrl, getSingleGistUrl, getUserDetailsUrl};