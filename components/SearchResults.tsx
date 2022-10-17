import { useMemo } from 'react'
import { ProductItem } from "./ProductItem"
import { List, ListRowRenderer, AutoSizer } from 'react-virtualized'


type SearchResultsProps = {
    results: Array<{
        id: number
        price: number
        title: string,
    }>
    onAddToWishlist: (id: number) => void
}

export function SearchResults({ results, onAddToWishlist }: SearchResultsProps) {
    const totalPrice = useMemo(() => (
        results.reduce((acc, product) => {
            return acc + product.price
        }, 0)
    ), [results])

    // function onAddToWishlist(id: number) {
    //     console.log(id)
    // }

    const onRowRenderer: ListRowRenderer = ({ index, key, style }) => {
        return (            
            <div key={key} style={style}>
                <ProductItem
                    product={ results[index] } 
                    onAddToWishlist={onAddToWishlist}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>Total: {totalPrice}</h2>

            {/* Esse list dá erro somente ao tentar dar build */}
            <List 
                height={300}
                width={700}
                rowHeight={30}
                overscanRowCount={5}
                rowCount={results.length}
                rowRenderer={onRowRenderer}
            />
        
            {/* {
                results.map(product => (
                    <ProductItem 
                        key={product.id}
                        product={product}
                        onAddToWishlist={onAddToWishlist}
                    />
                ))
            } */}

        </div>
    )
}