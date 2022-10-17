import { memo, useState } from 'react'
import dynamic from 'next/dynamic'

// import { AddProductToWishlist } from './AddProductToWishlist'
import { AddProductToWishlistProps } from './AddProductToWishlist'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
    return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
    loading: () => <span>Carregando...</span>
})

type ProductItemProps = {
    product: {
        id: number
        price: number
        title: string
    }
    onAddToWishlist: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
    return (
        <div>
            {product.title} - <strong>${product.price}</strong>

            <button onClick={() => setIsAddingToWishlist(true)}>
                Adicionar aos favoritos
            </button>

            { isAddingToWishlist && (
                <AddProductToWishlist
                    onAddToWishlist={() => onAddToWishlist(product.id)}
                    onRequestClose={() => setIsAddingToWishlist(false)}
                />
            )}
        </div>
    )
}


export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    //In this case, it would only re-renderize if the ID of the product change.
    //If the price or any other props change, but not the ID prop, it won't re-renderize
    // return prevProps.product.id === nextProps.product.id

    // Object.is compares both objects contents and returns true if they are equal
    return Object.is(prevProps.product, nextProps.product)
})