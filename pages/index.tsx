import { FormEvent, useCallback, useEffect, useState } from 'react'
import { SearchResults } from '../components/SearchResults'

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  // let tempo: any = null

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    setResults(data)
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id)
  },[])

  // function handleChange(value: string) {

  //   console.log(value)
  //   setSearch(value)
  // }

  // exemplo de uso de Debounce
  // useEffect(() => {    
  //     const timer = setTimeout(() => {
  //       console.log(search)  // aqui, exibição dos resultados enquanto digita.
  //     }, 500)    

  //   return () => {
  //     clearTimeout(timer)      
  //   }
  // }, [search])

  return (
    <div>
      <h1>Produtos</h1> 

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        
        <button type="submit">Buscar</button>        
      </form>

      <SearchResults results={results} onAddToWishlist={addToWishlist}/>
    </div>
  )
}