const axios = require('axios');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

/**
 * Base URL for the GitHub API.
 * @constant {string}
 */
const GITHUB_API_BASE_URL = 'https://api.github.com/users/';

/**
 * File path to the YAML file containing author information.
 * @constant {string}
 */
const YAML_FILE_PATH = path.join(process.cwd(), 'blog/authors.yml');


/**
 * Command to create an author by GitHub username.
 * @module
 */
exports.command = 'create <ghuser>'
exports.desc = 'Add author name <ghuser> using github username'
exports.builder = {}
exports.handler = async function (argv) {
    try {
        await addUser(argv.ghuser);
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * Adds a user from GitHub to a YAML file containing information about authors.
 * @async
 * @param {string} ghuser - The GitHub username to add as an author.
 * @throws {Error} If unable to access or write to the YAML file.
 */
async function addUser(ghuser) {
    try {
        const userData = await fetchUserData(ghuser);
        const data = readYamlFile(YAML_FILE_PATH);

        updateYamlData(data, ghuser, userData);

        writeYamlFile(YAML_FILE_PATH, data);
        console.log(`Added ${ghuser} into file ${YAML_FILE_PATH}`);
    } catch (error) {
        throw new Error('Unable to add user to the YAML file: ' + error.message);
    }
}

/**
 * Sends a request to fetch user data from GitHub.
 * @async
 * @param {string} ghuser - The GitHub username to retrieve information for.
 * @returns {Object} An object containing user information from GitHub.
 * @throws {Error} If unable to connect or retrieve information from GitHub.
 */
async function fetchUserData(ghuser) {
    const userResponse = await axios.get(GITHUB_API_BASE_URL + ghuser);
    return userResponse.data;
}

/**
 * Reads a YAML file and returns its content as a JavaScript object.
 * @param {string} filePath - The path to the YAML file.
 * @returns {Object} The content of the YAML file as a JavaScript object.
 */
function readYamlFile(filePath) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContents);
}


/**
 * Updates the YAML data with user information.
 * @param {Object} data - The existing YAML data as a JavaScript object.
 * @param {string} ghuser - The GitHub username of the user being added.
 * @param {Object} userData - The user information from GitHub.
 */
function updateYamlData(data, ghuser, userData) {
    data[ghuser] = {
        name: userData.login,
        title: 'Contributor',
        url: userData.html_url,
        image_url: userData.avatar_url,
    };
}

/**
 * Writes updated YAML data to a file.
 * @param {string} filePath - The path to the YAML file.
 * @param {Object} data - The updated YAML data as a JavaScript object.
 */
function writeYamlFile(filePath, data) {
    const newYamlContent = yaml.dump(data);
    fs.writeFileSync(filePath, newYamlContent, 'utf8');
}
