var e=require("contentful").createClient({space:"wnmf0uk29ees401",accessToken:"u4gO-dAQKVJhBnMs6lHGT_XbSvor8DKBUD8nt7CloQs"}),n=function(){return n="article",e.getEntries({content_type:n,order:t}).then(function(e){return e.items}).catch(function(e){console.error(e)});var n,t},t=function(n){return function(n,t){return e.getEntries({content_type:n,"fields.slug[in]":t}).then(function(e){return e.items[0]}).catch(function(e){console.error(e)})}("article",n)};export{t as a,n as g};