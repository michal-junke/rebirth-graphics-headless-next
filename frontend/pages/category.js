/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Error from 'next/error';
import WPAPI from 'wpapi';
import Pagination from 'react-paginating';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu/Menu';
import Config from '../config';

import styles from './styles/category.module.css';
import FeaturedImages from '../components/FeaturedImages/FeaturedImages';

const wp = new WPAPI({ endpoint: Config.apiUrl });

class Category extends Component {
  static async getInitialProps(context) {
    const { query } = context;
    const { slug } = context.query;
    const findId = providedSlug => {
      let id;
      // eslint-disable-next-line default-case
      switch (providedSlug) {
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


    let postsFromApi = {};
    const perPage = 4;
    if (query.page) {
      postsFromApi = await wp
        .posts().categories(findId(slug))
        .perPage(perPage)
        .page(query.page);
    } else {
      postsFromApi = await wp
        .posts().categories(findId(slug))
        .perPage(perPage)
        .page(1);
    }

    return {
      posts: postsFromApi,
      // eslint-disable-next-line no-underscore-dangle
      total: postsFromApi._paging.total,
      // eslint-disable-next-line no-underscore-dangle
      totalPages: postsFromApi._paging.totalPages,
      queryPage: query.page,
      perPage,
      slug,
    };
  }

  firstLastButtonHandler = (currentPage, pageNumber, isOnTheLeft, slug, totalPages) => {
    if (currentPage !== pageNumber && ((currentPage <= pageNumber - 2 && !isOnTheLeft && totalPages > 3) || (currentPage >= 3 && isOnTheLeft && totalPages > 3))) {
      return (
        <Link
          href={{
            pathname: '/category',
            query: { page: pageNumber, slug },
          }}
          passHref
          as={`/${slug}${pageNumber === 1 ? '' : `/${pageNumber}`}`}
        >
          <a className="last pagination-link p-2 flex justify-center items-center w-8 h-8">{pageNumber}</a>
        </Link>
      );
    }
  }

  ellipsisHandler = (currentPage, totalPages, isOnTheLeft) => {
    if ((currentPage >= 4 && isOnTheLeft && totalPages > 4) || (currentPage <= totalPages - 3 && !isOnTheLeft && totalPages > 4)) {
      return <span className="pagination-ellipsis p-2">&hellip;</span>;
    }
  }

  render() {
    const {
      posts, total, totalPages, queryPage, perPage, slug, headerMenu, acfOptions,
    } = this.props;
    if (total === 0 || queryPage > totalPages) return <Error statusCode={404} />;

    const pagination = (
      <Pagination
        total={total}
        limit={perPage}
        pageCount={3}
        currentPage={queryPage ? parseInt(queryPage, 10) : 1}
        className={totalPages > 1 ? 'flex justify-center pb-20' : 'hidden'}
      >
        {({
          pages,
          currentPage,
        }) => (
          <>
            {this.firstLastButtonHandler(currentPage, 1, true, slug, totalPages)}

            {this.ellipsisHandler(currentPage, totalPages, true, slug)}

            {pages.map(page => {
              let isCurrent = '';
              if (page === currentPage) {
                isCurrent = ' is-current';
              }
              return (
                <Link
                  key={page}
                  href={{ pathname: '/category', query: { page, slug } }}
                  passHref
                  as={`/${slug}${page === 1 ? '' : `/${page}`}`}
                >
                  <a className={`pagination-link${isCurrent} p-2 flex justify-center items-center`}>{page}</a>
                </Link>
              );
            })}

            {this.ellipsisHandler(currentPage, totalPages, false, slug)}

            {this.firstLastButtonHandler(currentPage, totalPages, false, slug, totalPages)}
          </>
        )}
      </Pagination>
    );

    const fposts = posts.map(post =>
      /* console.log(post); */
      (
        <div key={post.id} className={[styles['post-tease'], 'post-tease', 'pb-10', 'md:my-24', 'md:relative', 'md:mx-auto'].join(' ')}>
          <p className="text-right post-gap mt-2 md:hidden">{post.formatted_date}</p>
          <h2 className="md:px-24 mt-3 text-center leading-tight md:hidden">
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <a dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </Link>
          </h2>
          <FeaturedImages images={post.acf.featured_gallery} />
          <div className="desktop-container lg:py-6 xl:py-10">
            {/* Heading and date for desktop */}
            <p className="text-right mt-2 hidden md:block pr-12 md:pb-4 lg:pb-6">{post.formatted_date}</p>
            <h2 className="md:px-24 mt-3 text-center leading-tight hidden md:block md:pb-6">
              <Link
                as={`/post/${post.slug}`}
                href={`/post?slug=${post.slug}&apiRoute=post`}
              >
                <a dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              </Link>
            </h2>
            <div className="tags pb-3 text-center md:pt-3 lg-pt-6">
              {post.tag_names.map(tag => (
                <span key={tag} className="pr-1">
                  #
                  {tag}
                </span>
              ))}
            </div>
            <div
              className=" md:px-16 md:mx-auto max-w-screen-md md:text-sm md:leading-tight lg:leading-normal"
            // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            />
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <button className={[styles['read-more'], 'block', 'cursor-pointer', 'ml-auto', 'mr-6', 'md:mr-12', 'text-2xl'].join(' ')} type="button">
                czytaj więcej...
              </button>
            </Link>
          </div>
        </div>
      ));
    return (
      <Layout acfOptions={acfOptions}>
        <Menu menu={headerMenu} />
        <div className="image-stub" style={{ background: 'violet', paddingBottom: '35%' }}>Test zdjęcia</div>
        <div className="post-list">
          {fposts}
        </div>
        {pagination}
      </Layout>
    );
  }
}

export default PageWrapper(Category);
