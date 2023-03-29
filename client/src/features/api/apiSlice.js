import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// RTK Query

export const api = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (build) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    // builder.mutation() would be for posts modifiying server
    getFirstProduct: build.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/products?page=1&count=1',
    }),
    getSpecificProduct: build.query({
      // The URL for the request is '/fakeApi/posts'
      query: (productId) => `/products/${productId}`,
    }),
    getProductStyles: build.query({
      // The URL for the request is '/fakeApi/posts'
      query: (productId) => `/products/${productId}/styles`,
    }),
    getProductReviews: build.query({
      // The URL for the request is '/fakeApi/posts'
      query: (obj) => `/reviews?count=${obj.count}&sort=${obj.sortState}&product_id=${obj.id}`,
    }),
    getMetaReviews: build.query({
      // The URL for the request is '/fakeApi/posts'
      query: (productId) => `/reviews/meta?product_id=${productId}`,
    }),
    getRelatedProducts: build.query({
      // The URL for the request is '/fakeApi/posts'
      query: (productId) => `/products/${productId}/related`,
    }),
    getQuestions: build.query({
      query: ({ productId, page, count }) => `/qa/questions?product_id=${productId}&page=${page}&count=${count}`,
    }),
    getProductInfo: build.query({
      async queryFn(productId, _queryApi, _extraOptions, fetchWithBQ) {
        const details = await fetchWithBQ(`/products/${productId}`);
        if (details.error) return { error: details.error };
        const styles = await fetchWithBQ(`/products/${productId}/styles`);
        return styles.data && styles.data.results && styles.data.results.length
          ? { data: { details: details.data, styles: styles.data } } : { error: 'Error fetching styles' };
      },
    }),
    getRelatedProductInfo: build.query({
      async queryFn(productId, _queryApi, _extraOptions, fetchWithBQ) {
        const related = await fetchWithBQ(`/products/${productId}/related`);
        if (related.error) return { error: related.error };
        const allItems = await Promise.all(related.data.map(async (item) => {
          const relatedItem = {};
          relatedItem.product_id = item;
          const itemDetails = await fetchWithBQ(`/products/${item}`);
          itemDetails.data
            ? relatedItem.details = itemDetails.data
            : relatedItem.detailsError = itemDetails.error;
          const ratingsDetails = await fetchWithBQ(`/reviews/meta?product_id=${item}`);
          ratingsDetails.data ? relatedItem.ratings = ratingsDetails.data : relatedItem.ratingsError = ratingsDetails.error;
          const allPhotos = await fetchWithBQ(`/products/${item}/styles`);
          allPhotos.data ? relatedItem.photos = allPhotos.data : relatedItem.photoError = allPhotos.error;
          return relatedItem;
        }));
        return { data: allItems };
      },
    }),
    addToCart: build.mutation({
      query: skuId => ({
        url: '/cart',
        method: 'POST',
        body: { sku_id: parseInt(skuId, 10) },
      }),
    }),
    postNewReview: build.mutation({
      query: (obj) => ({
        url: '/reviews',
        method: 'POST',
        body: obj,
      }),
    }),
    helpfulReview: build.mutation({
      query: (review_id) => ({
        url: `/reviews/${review_id}/helpful`,
        method: 'PUT',
        body: {review_id},
      }),
    }),
    reportReview: build.mutation({
      query: (review_id) => ({
        url: `/reviews/${review_id}/report`,
        method: 'PUT',
        body: {review_id: review_id},
      }),
    }),
    postNewQuestion: build.mutation({
      query: (obj) => ({
        url: '/qa/questions',
        method: 'POST',
        body: obj,
      }),
    }),
    postNewAnswer: build.mutation({
      query: ({ body, questionId }) => ({
        url: `/qa/questions/${questionId}/answers`,
        method: 'POST',
        body,
      }),
    }),
    helpfulQNA: build.mutation({
      query: ({ item, itemId }) => ({
        url: `/qa/${item}/${itemId}/helpful`,
        method: 'PUT',
        validateStatus: (response) => response.status === 204,
      }),
    }),
    reportAnswer: build.mutation({
      query: (answerId) => ({
        url: `/qa/answers/${answerId}/report`,
        method: 'PUT',
        validateStatus: (response) => response.status === 204,
      }),
    }),
  }),
  // EXAMPLE MUTATION endpoint!!!
  // updateReview: build.mutation({
  //   query: reviewId => ({
  //     url: `/reviews/${reviewId}`,
  //     method: 'POST',
  //     body: updatedReview
  //   })
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetFirstProductQuery,
  useGetSpecificProductQuery,
  useGetProductStylesQuery,
  useGetProductInfoQuery,
  useGetProductReviewsQuery,
  useGetRelatedProductsQuery,
  useGetQuestionsQuery,
  useGetRelatedProductInfoQuery,
  useGetMetaReviewsQuery,
  useLazyGetMetaReviewsQuery,
  useAddToCartMutation,
  usePostNewReviewMutation,
  useHelpfulReviewMutation,
  useReportReviewMutation,
  usePostNewQuestionMutation,
  usePostNewAnswerMutation,
  useHelpfulQNAMutation,
  useReportAnswerMutation,
} = api;
