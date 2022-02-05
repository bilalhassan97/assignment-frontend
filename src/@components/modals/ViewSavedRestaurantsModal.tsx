import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getSavedRestaurants } from "@store/restaurant/RestaurantActions";
import { ImageAsset, Loader } from "@components";

interface ViewSavedRestaurantsModalModalProps {
  onClose: any;
  open: boolean;
  collectionId: string | undefined;
}

const limit = 10;

const ViewSavedRestaurantsModalModal: React.FC<
  ViewSavedRestaurantsModalModalProps
> = (props) => {
  const { onClose, open, collectionId } = props;
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();

  const { loading }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.app
  );

  const { restaurants, totalRestaurants }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.restaurant
  );

  const [currentPageNo, setCurrentPageNo] = useState(1);

  const observer = useRef<any>();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const hasMore = currentPageNo < Math.ceil(totalRestaurants / limit);
        if (entries[0].isIntersecting && hasMore && collectionId) {
          setCurrentPageNo(currentPageNo + 1);
          const payload = {
            page: currentPageNo + 1,
            limit,
            collectionId,
          };
          dispatch(getSavedRestaurants(payload));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, currentPageNo, dispatch, totalRestaurants, collectionId]
  );

  useEffect(() => {
    if (collectionId) {
      const payload = {
        page: 1,
        limit,
        collectionId,
      };
      dispatch(getSavedRestaurants(payload));
    }
  }, [dispatch, collectionId]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Loader loading={loading} />
      <div className="flex flex-col items-center px-8 py-6">
        {restaurants?.length > 0 ? (
          <div>
            {restaurants.map(
              ({ _id, name, schedule }: Restaurant, index: number) => (
                <Paper
                  className="flex px-2 py-1.5 mb-4 items-center rounded-xl"
                  ref={restaurants.length === index + 1 ? lastElementRef : null}
                  elevation={3}
                  key={_id}
                >
                  <ImageAsset
                    src="restaurant"
                    className="w-2/4 h-40 object-cover rounded-xl"
                  />
                  <div className="flex flex-col items-center">
                    <p className="font-medium text-lg">{name}</p>
                    <div className="flex flex-wrap justify-center mt-2 text-white text-center text-sm">
                      {schedule?.length > 0 &&
                        schedule.map(
                          ({
                            day,
                            startHours,
                            startMinutes,
                            endHours,
                            endMinutes,
                          }) => (
                            <p
                              className="bg-gradient-to-r from-primary  to-pink-500 shadow-md rounded-full px-2 py-1 mb-2 mr-2"
                              key={day}
                            >
                              {day}, {startHours === 0 ? "00" : startHours}:
                              {startMinutes === 0 ? "00" : startMinutes}
                              {" - "}
                              {endHours === 0 ? "00" : endHours}:
                              {endMinutes === 0 ? "00" : endMinutes}
                            </p>
                          )
                        )}
                    </div>
                  </div>
                </Paper>
              )
            )}
          </div>
        ) : (
          <p className="text-center text-xl font-bold">No Restaurants Found!</p>
        )}
      </div>
    </Dialog>
  );
};

export default ViewSavedRestaurantsModalModal;
