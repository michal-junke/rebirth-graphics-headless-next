const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/post/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'post' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/page/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'page' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/category/:slug', (req, res) => {
      const actualPage = '/category';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/_preview/:id/:rev/:type/:status/:wpnonce', (req, res) => {
      const actualPage = '/preview';
      const {
        id, rev, type, status, wpnonce,
      } = req.params;
      const queryParams = {
        id, rev, type, status, wpnonce,
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/:slug(listy|ilustracje|tworcze-zycie|podroze)/:page([0-9]+)', (req, res) => {
      const actualPage = '/category';
      const catId = slug => {
        let id;
        // eslint-disable-next-line default-case
        switch (slug) {
          case 'listy':
            id = 3;
            break;
          case 'ilustracje':
            id = 4;
            break;
          case 'tworcze-zycie':
            id = 5;
            break;
          case 'podroze':
            id = 6;
        }
        return id;
      };

      const queryParams = {
        apiRoute: 'posts', per_page: 2, page: req.params.page, categories: catId(req.params.slug), slug: req.params.slug,
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/:slug', (req, res) => {
      let actualPage;
      let queryParams;
      const categorySlugs = ['listy', 'tworcze-zycie', 'ilustracje', 'podroze'];
      if (categorySlugs.includes(req.params.slug)) {
        actualPage = '/category';
        queryParams = { slug: req.params.slug, apiRoute: 'category' };
      } else {
        actualPage = '/post';
        queryParams = { slug: req.params.slug, apiRoute: 'page' };
      }
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(3001, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3001');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
