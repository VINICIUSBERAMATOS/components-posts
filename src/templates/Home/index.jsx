import { Component } from "react";

import "./style.css";

import { Post } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  async componentDidMount() {
    /// Inicia o componente
    await this.loadPosts();
  }

  //useEffect(() =>{ //Metodo para NextJs
  //  loadPosts();
  //},[]);

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  /// Método para gerar mais posts na página (paginação)
  loadMorePosts = () => {
    const { page, allPosts, postsPerPage, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };
  ///////////////////////////////////////////////////

  componentDidUpdate() {
    /// Atualiza o componente
  }
  componentWillUnmount() {
    /// Limpa o lixo dos componentes
  }

  /// Filtro de posts conforme valor digitado ///
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };
  ////////////////////////////////////////////////////
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

    /// Se a página somada com os posts por página forem maior ou iguais ao total de posts, retorna true e o botão é desabilitado
    const noMorePosts = page + postsPerPage >= allPosts.length;

    /// Se o campo (searchValue) de busca tiver valor
    ///  Vai filtrar todos os posts retornando aqueles que contém (includes) no título (title) o valor digitado
    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : /// Se não tiver valor vai retornar os posts normalmente
        posts;

    return (
      <section className="container">
        <div className="search-container">
          {
            !!searchValue && <h1>Valor da busca: {searchValue}</h1> /// Falso, não exibe no topo, se tiver valor é true e exibe o digitado
          }

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && <Post posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>Não existem posts com essa busca!</p>}
        <div className="button-container">
          {!searchValue && ( //se não tiver busca é para exibir o botão
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
