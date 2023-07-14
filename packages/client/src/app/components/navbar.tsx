import { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';
import instant from '../provider/axios.instant';
import { CategoryUrl, ProductUrl } from '../provider/api.constant';
import { ICategory } from '../provider/interface';

function Navbar({ children }: { children: JSX.Element }) {
  const { user, currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState({
    url: 'https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=170667a&w=0&k=20&c=3Jh8trvArKiGdBCGPfe6Y0sUMsfh2PrKA0uHOK4_0IM=',
  });
  const [productData, setProductData] = useState({
    product_id: '',
    product_name: '',
    image: '',
    category_id: '',
    price: 0,
  });

  const [categoryData, setCategoryData] = useState([]);

  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const inputData = {
      product_id: productData.product_id,
      product_name: productData.product_name,
      image: productData.image,
      category_id: productData.category_id,
      price: productData.price,
      user_id: currentUser._id,
    };
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .post(ProductUrl.create, inputData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then(() => alert('Add product complete'))
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

  function logOut() {
    localStorage.removeItem('Token');
    navigate('/sign-in');
    window.location.reload();
  }

  useEffect(() => {
    instant.get(CategoryUrl.list).then((res) => setCategoryData(res.data));
  }, []);

  return user === true ? (
    <>
      <nav className="h-16 w-full bg-zinc-400 shadow-lg">
        <div className="flex items-center h-full ml-7">
          <div className="flex items-center justify-start w-full">
            <span className="text-zinc-600 uppercase font-extrabold text-xl">
              Product List
            </span>
          </div>

          {/* <div className="flex items-center h-9 w-[1100px] bg-white ml-10 rounded">
            <LiaSearchSolid className="text-2xl text-zinc-400 ml-3" />
            <input
              type="search"
              id="search"
              className="pl-2 pr-4 w-full rounded focus:outline-none"
              placeholder="Type product name to search ..."
            />
          </div>
          <select
            name="sortBy"
            id="sortBy"
            className="w-32 h-9 pl-3 rounded cursor-pointer ml-8"
          >
            <option value="1">Sort By</option>
            <option value="1">name</option>
            <option value="1">name</option>
          </select> */}
          <div className="flex items-center justify-end w-full mr-5">
            <div
              className="flex items-center pl-3 h-9 w-36 bg-zinc-600 rounded cursor-pointer ml-8"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <span className="text-zinc-200">Add Product</span>
              <AiOutlinePlus className="text-white ml-4" />
            </div>
            <div className="flex items-center justify-center h-12 w-12 bg-zinc-500 rounded-full border-2 ml-7">
              <CiUser className="text-white text-3xl" />
            </div>
            <span className="text-lg font-semibold text-zinc-800 m-2">
              {currentUser.username}
            </span>
            <span
              className="text-md ml-2 cursor-pointer hover:underline hover:underline-offset-2"
              onClick={logOut}
            >
              Log out
            </span>
          </div>
        </div>
      </nav>
      <div>
        {children}
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
                          onChange={handleOnChange}
                        >
                          <option value="">Choose Category</option>
                          {categoryData.map((item: ICategory) => (
                            <option value={item._id}>
                              {item.category_name}
                            </option>
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
                          onChange={handleOnChange}
                        />
                      </div>
                      <div className="row-span-1 col-span-2">
                        <button
                          type="submit"
                          className="h-12 w-24 bg-zinc-500 text-zinc-200 shadow-md rounded-xl"
                        >
                          Add
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
    </>
  ) : (
    children
  );
}
export default Navbar;
