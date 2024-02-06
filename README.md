# Engineering Wiki
Notes on setup guides, best practices, guidelines,...

## Setup

Start writing document by create markdown `.md` file in folder [docs](./docs/).

To preview website, install Node 18 and dependencies:

```bash
npm install
```

Start development server:

```bash
npm run start
```

Website is at: http://localhost:3000/

## Learn

Want to learn more? Check out:

- [Docusaurus 5-minute tutorial](https://tutorial.docusaurus.io/)
- [Docusaurus docs](https://docusaurus.io/docs)

## Blog Contribute

To start writing your blog, you can run the following script:
```bash
./cli.js blog create <title>
```
If you want to write a blog post in the form of a directory, please add the --type=d option.


To add new author information, please run the script:
```bash
./cli.js author create <github-username>
```