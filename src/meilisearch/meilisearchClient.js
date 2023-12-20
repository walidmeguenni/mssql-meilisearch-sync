import { MeiliSearch } from 'meilisearch';

const meiliSearchClient = new MeiliSearch({
  host: 'http://localhost:7700', 
  //apiKey: 'masterKey', only if your using cloud
});

export default meiliSearchClient;
