import { useDispatch, useSelector } from "react-redux";

import { Header, Loader } from "@components";
import Filter from "./components/Filter";
import RestaurantCard from "./components/RestaurantCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRestaurants } from "@store/restaurant/RestaurantActions";

interface HomeProps {}

const limit = 10;

const Home: React.FC<HomeProps> = () => {
  const { loading }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.app
  );
  const { restaurants, totalRestaurants }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.restaurant
  );
  const dispatch = useDispatch();

  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [filter, setFilter] = useState({});

  const observer = useRef<any>();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const hasMore = currentPageNo < Math.ceil(totalRestaurants / limit);
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPageNo(currentPageNo + 1);
          const payload = {
            page: currentPageNo + 1,
            limit,
            ...filter,
          };
          dispatch(getRestaurants({ payload }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, currentPageNo, dispatch, filter, totalRestaurants]
  );

  useEffect(() => {
    const payload = {
      page: 1,
      limit,
    };
    dispatch(getRestaurants({ payload }));
  }, [dispatch]);

  const handleFilterChange = (filter: any) => {
    setFilter(filter);
    const payload = {
      page: 1,
      limit,
      ...filter,
    };
    setCurrentPageNo(1);
    dispatch(getRestaurants({ payload }));
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <Loader loading={loading} />
      <Header />
      <Filter handleFilterChange={handleFilterChange} />
      {restaurants?.length > 0 ? (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 py-10 lg:py-20 px-4 lg:px-[10vw]">
          {restaurants.map((restaurant: Restaurant, index: number) => (
            <RestaurantCard
              restaurant={restaurant}
              key={restaurant._id}
              restaurantRef={
                restaurants.length === index + 1 ? lastElementRef : null
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-3xl font-bold py-10 lg:py-20">
          No Restaurants Found!
        </p>
      )}
    </div>
  );
};

export default Home;
