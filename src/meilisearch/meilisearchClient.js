const  { MeiliSearch } = require('meilisearch');

const meiliSearchClient = new MeiliSearch({
  host: 'http://host.docker.internal:7700/', 
  //apiKey: 'masterKey', only if your using cloud
});

module.exports = meiliSearchClient;
