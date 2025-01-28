import { TProduct } from "@/types";

type ProductListProps = {
  books: TProduct[];
};

const ProductList = ({ books }: ProductListProps) => {
   
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="border rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            width={300}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="text-lg font-bold mb-2">${book.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-2">{book.category}</p>
            <p className="text-sm text-gray-500">
              {book.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
