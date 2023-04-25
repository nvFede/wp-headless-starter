import { gql } from "@apollo/client";
import { client } from "@/lib/apollo";

/**
 * Executes a given GraphQL query using the Apollo client
 * @param {string} query - GraphQL query to execute
 * @returns {Promise<object>} - Response object containing the data returned by the query
 */

const executeQuery = (query) => async () => {
  try {
    const { data } = await client.query({
      query: gql`
        ${query}
      `,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to execute query: ${error.message}`);
  }
};

/**
 * @param {number} $first - The maximum number of posts to return (default is 10)
 * GraphQL query to get all posts
 */
export const GET_ALL_POSTS = executeQuery`
query GetPosts($first: Int = 10) {
  posts(first: $first) {
      nodes {
        id
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;
/**
 * @param {string} $id - The id of the post to fetch
 * GraphQL query to get a single post by ID
 */
export const GET_POST_BY_ID = executeQuery`
  query GetPost($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      id
      title
      content
      date
      author {
        name
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        focuskw
      }
    }
  }
`;

/**
 * GraphQL query to get all posts associated with a given category
 * @param {string} $slug - The slug of the category to fetch posts for
 * @param {number} $first - The maximum number of posts to return (default is 10)
 */
export const GET_POSTS_BY_CATEGORY = executeQuery`
  query GetPostsByCategory($slug: String!, $first: Int = 10) {
    category(id: $slug, idType: SLUG, first: $first) {
      name
      posts {
        nodes {
          id
          title
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

/**
 * GraphQL query to get all posts associated with a given tag
 * @param {string} $slug - The slug of the tag to fetch posts for
 * @param {number} $first - The maximum number of posts to return (default is 10)
 */
export const GET_POSTS_BY_TAG_NAME = gql`
  query GetPostsByTag($name: String!, $first: Int = 10) {
    tag(name: $name, first: $first) {
      name
      posts {
        nodes {
          id
          title
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
