import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

import { addToCart } from './store/carrinhoSlice'
import { favoritar } from './store/favoritosSlice'
import { useGetProdutosQuery } from './store/produtosAPI'
import { Produto } from './types'

import { GlobalStyle } from './styles'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  const { data: produtos = [], isLoading } = useGetProdutosQuery()
  const carrinho = useSelector((state: RootState) => state.cart.items)
  const favoritos = useSelector((state: RootState) => state.favoritos.items)
  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(addToCart(produto))
    }
  }

  function handleFavoritar(produto: Produto) {
    dispatch(favoritar(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <Produtos
            produtos={produtos}
            favoritos={favoritos}
            favoritar={handleFavoritar}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        )}
      </div>
    </>
  )
}

export default App