export const loadPosts = async () => {
  const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
  const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
  //.then((response) => response.json())
  //.then((posts) => this.setState({ posts }));

  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postsAndPhotos = postsJson.map((post, index) => {
    //// pegando cada post e seu index
    return { ...post, cover: photosJson[index].url }; /// Vai pegar todos os campos do posts e associar mais um campo das fotos conforme o indice do post pegando a URL
  });

  return postsAndPhotos;
};
