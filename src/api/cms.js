const contentful = require('contentful')

//contentfulの設定値
const client = contentful.createClient({
  space: "wnmf0uk29ees401",
  accessToken: "u4gO-dAQKVJhBnMs6lHGT_XbSvor8DKBUD8nt7CloQs"
})


//記事一覧取得と記事取得

// slug指定で記事取得。これid指定の方が綺麗だからできるなら後で直す。
const fetchEntryByContentIdAndSlug = (id, slug) => client.getEntries({
    content_type: id,
    'fields.slug[in]': slug
  })
  .then((response) => response.items[0])
  .catch((error) => {
    console.error(error)
  })

// 記事一覧取得
const fetchEntriesForContentId = (id, orderBy) => client.getEntries({
    content_type: id,
    order: orderBy
  })
  .then((response) => {
    return response.items
  })
  .catch((error) => {
    console.error(error)
  })

  export const getArticles = () => fetchEntriesForContentId('article')
  export const getArticle = (slug) => fetchEntryByContentIdAndSlug('article', slug)
