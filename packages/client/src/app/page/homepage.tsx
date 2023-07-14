import { useEffect, useState } from 'react';
import instant from '../provider/axios.instant';
import { CategoryUrl, ProductUrl } from '../provider/api.constant';
import { ICategory, IProduct } from '../provider/interface';

function Homepage() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState({
    url: 'https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=170667a&w=0&k=20&c=3Jh8trvArKiGdBCGPfe6Y0sUMsfh2PrKA0uHOK4_0IM=',
  });
  const [productData, setProductData] = useState({
    product_id: '',
    product_name: '',
    image: '',
    category_id: {
      _id: '',
      category_name: '',
    },
    price: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [productID, setProductID] = useState({
    _id: '',
  });

  function findById(product_id: string) {
    instant
      .get(ProductUrl.list + product_id)
      .then((res) => setProductData(res.data));
    setPreview({ url: productData.image });
    setProductID({ _id: product_id });
  }

  function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const inputData = {
      product_id: productData.product_id,
      product_name: productData.product_name,
      image: productData.image,
      category_id: productData.category_id,
      price: productData.price,
    };
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .put(ProductUrl.update + productID._id, inputData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then(() => alert('Update product complete'))
        .then(() => setShowModal(false))
        .then(() => window.location.reload());
    }
  }

  function handleFileOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        const result = reader.result;
        setProductData({
          ...productData,
          [e.target.name]: result,
        });
      };
      setPreview({ url: URL.createObjectURL(e.target.files[0]) });
    }
  }

  function handleOnChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  }

  function onDelete(product_id: string) {
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .delete(ProductUrl.delete + product_id, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then(() => window.location.reload());
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .get(`${ProductUrl.list}?product_name=`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((res) => {
          setData(res.data);
        });
    }
  }, []);

  useEffect(() => {
    instant.get(CategoryUrl.list).then((res) => setCategoryData(res.data));
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen flex justify-center bg-zinc-100 overflow-hidden">
        <div className="w-full lg:w-5/6 mt-14">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center">Product ID</th>
                  <th className="py-3 px-6 text-center">Image</th>
                  <th className="py-3 px-6 text-center">Product Name</th>
                  <th className="py-3 px-6 text-center">category</th>
                  <th className="py-3 px-6 text-center">price</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {data.map((item: IProduct) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{item.product_id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center justify-center">
                        <img
                          src={item.image}
                          alt="image"
                          className="w-20 h-20 rounded-md shadow-md object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.product_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className="">{item.category_id.category_name}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className="">{item.price}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div
                          className="w-4 mr-2 transform hover:text-zinc-500 cursor-pointer hover:scale-150"
                          onClick={() => {
                            findById(item._id);
                            setShowModal(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                        <div
                          className="w-4 mr-2 transform hover:text-zinc-500 cursor-pointer hover:scale-150"
                          onClick={() => onDelete(item._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal ? (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-zinc-100">
            <div className="w-full">
              <div className="my-20 max-w-[400px] mx-auto">
                <form onSubmit={onSubmit}>
                  <div className="mb-8 w-96 h-96 grid grid-rows-4 grid-flow-col gap-9">
                    <div className="flex items-center row-span-2">
                      <label htmlFor="image">
                        <img
                          src={preview.url}
                          alt="image"
                          className="h-48 w-48 object-cover cursor-pointer bg-zinc-200 shadow-md rounded-md"
                        />
                        <input
                          type="file"
                          className="hidden"
                          name="image"
                          id="image"
                          accept="image/png, image/jpeg"
                          onChange={handleFileOnChange}
                        />
                      </label>
                    </div>
                    <div className="row-span-1">
                      <select
                        name="category_id"
                        id="category_id"
                        className="h-10 w-48 pl-3 focus:outline-none shadow-md"
                        value={productData.category_id.category_name}
                        onChange={handleOnChange}
                      >
                        <option value="">Choose Category</option>
                        {categoryData.map((item: ICategory) => (
                          <option value={item._id}>{item.category_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end col-span-1">
                      <div
                        className="flex items-center justify-center text-zinc-400 h-12 w-24 cursor-pointer bg-zinc-200 shadow-md rounded-xl"
                        onClick={() => setShowModal(false)}
                      >
                        <span>Close</span>
                      </div>
                    </div>
                    <div className="flex items-end row-span-1  col-span-2">
                      <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        placeholder="Product ID"
                        className="h-10 w-48 pl-3 focus:outline-none shadow-md"
                        value={productData.product_id}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="flex items-center row-span-1 col-span-2">
                      <input
                        type="text"
                        name="product_name"
                        id="product_name"
                        placeholder="Product Name"
                        className="h-10 w-48 pl-3 focus:outline-none shadow-md"
                        value={productData.product_name}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="row-span-1 col-span-2">
                      <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Price"
                        className="h-10 w-48 pl-3 focus:outline-none shadow-md"
                        value={productData.price}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="row-span-1 col-span-2">
                      <button
                        type="submit"
                        className="h-12 w-24 bg-zinc-500 text-zinc-200 shadow-md rounded-xl"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Homepage;
