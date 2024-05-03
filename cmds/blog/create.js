const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const { execSync } = require('child_process');

/**
 * Command to create a markdown blog file or directory with the specified title and structure type.
 * @module
 */
exports.command = 'create <title>'
exports.desc = 'Create markdown blog file with <title> and struct directory or file'
exports.builder = function (yargs) {
    return yargs.option('type', {
        describe: 'Struct type blog: d (folder) or f (file)',
        choices: ['d', 'f'],
        default: 'f',
        demandOption: true,
    })
}
exports.handler = function (argv) {
    try {
        createBlogPost(argv);
    } catch (error) {
        console.error(error.message);
    }
}


/**
 * Creates a blog post file or directory based on the provided title and type.
 * 
 * @param {Object} argv - The object containing command line arguments.
 * @param {string} argv.title - The title of the blog post.
 * @param {string} argv.type - The type of blog structure ('d' for directory or 'f' for file).
 */
const createBlogPost = (argv) => {
    let gitUsername = ''
    process.chdir(path.join(process.cwd(), 'blog'));
    const date = new Date().toISOString().split('T')[0];
    const slug = slugify(argv.title.toLowerCase());

    try {
        gitUsername = execSync('git config user.name').toString().trim();
        console.log(`Your Username GitHub is: ${gitUsername}`);
    } catch (error) {
        console.error('Cannot fetch your username GitHub from git config', error);
    }

    const content = `---
slug: ${slug}
title: "${argv.title}"
authors: [${gitUsername}]
tags: []
---\n`;

    if (argv.type === 'f') {
        const fileName = `${date}-${slug}.md`;
        createBlogFile(fileName, content);
    } else if (argv.type === 'd') {
        const dirName = `${date}-${slug}`;
        createBlogDirectory(dirName, content);
    }
};


/**
 * Creates a blog post file with the specified title and content.
 * 
 * @param {string} filePath - The path to the blog post file.
 * @param {string} content - The content to write to the file.
 * @throws {Error} If the file already exists.
 */
function createBlogFile(filePath, content) {
    if (fs.existsSync(filePath)) {
        throw new Error('File already exists');
    }
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
}

/**
 * Creates a blog post directory with an 'index.md' file inside it.
 * 
 * @param {string} dirPath - The path to the blog post directory.
 * @param {string} content - The content to write to the 'index.md' file.
 * @throws {Error} If the directory or 'index.md' file already exists.
 */
function createBlogDirectory(dirPath, content) {
    if (fs.existsSync(dirPath) || fs.existsSync(dirPath + '.md')) {
        throw new Error('Folder or file already exists');
    }
    fs.mkdirSync(dirPath);
    fs.writeFileSync(path.join(dirPath, 'index.md'), content);
    console.log(`Created folder and file: ${path.join(dirPath, 'index.md')}`);
}
