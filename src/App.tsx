import { useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { addToCart } from './store/carrinhoSlice'
import { useGetProdutosQuery } from './store/produtosAPI'
import { Produto } from './types'

import { GlobalStyle } from './styles'

function App() {
  const { data: produtos = [], isLoading } = useGetProdutosQuery()
  const dispatch = useDispatch<AppDispatch>()
  const carrinho = useSelector((state: RootState) => state.cart.items)

  const [favoritos, setFavoritos] = useState<Produto[]>([])

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(addToCart(produto))
    }
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
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
            favoritar={favoritar}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        )}
      </div>
    </>
  )
}

export default App