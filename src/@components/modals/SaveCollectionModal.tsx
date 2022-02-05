import { Button, Loader } from "@components";
import { Dialog } from "@mui/material";
import { getCollections } from "@store/collection/CollectionActions";
import { saveRestaurant } from "@store/restaurant/RestaurantActions";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";

interface SaveCollectionModalProps {
  onClose: any;
  open: boolean;
  restaurantId: string | undefined;
}

const limit = 10;

const SaveCollectionModal: React.FC<SaveCollectionModalProps> = (props) => {
  const { onClose, open, restaurantId } = props;
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();

  const { loading }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.app
  );
  const { collections, totalCollections }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.collection
  );

  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [collectionId, setCollectionId] = useState<string | undefined>();

  const observer = useRef<any>();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const hasMore = currentPageNo < Math.ceil(totalCollections / limit);
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPageNo(currentPageNo + 1);
          const payload = {
            page: currentPageNo + 1,
            limit,
          };
          dispatch(getCollections(payload));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, currentPageNo, dispatch, totalCollections]
  );

  useEffect(() => {
    const payload = {
      page: 1,
      limit,
    };
    dispatch(getCollections(payload));
  }, [dispatch]);

  const saveHandler = () => {
    const payload = { restaurantId, collectionId };
    dispatch(saveRestaurant({ payload }));
    setCollectionId(undefined);
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Loader loading={loading} />
      <div className="flex flex-col items-center px-8 py-4">
        <p className="text-xl mb-2 font-bold">Choose Collection to Save</p>
        <Button
          color="secondary"
          disabled={!restaurantId || !collectionId}
          onClick={saveHandler}
        >
          Confirm
        </Button>
        {collections?.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4 w-full">
            {collections.map(({ _id, title }: Collection, index: number) => (
              <div
                ref={lastElementRef}
                key={_id}
                className="bg-[url(assets/images/collectionBg.jpg)] bg-cover h-20 flex flex-col items-center justify-center w-full cursor-pointer rounded-md text-white font-bold text-xl"
                onClick={() => setCollectionId(_id)}
              >
                {_id === collectionId && <DoneIcon />}
                <p className="capitalize">{title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-4 text-xl font-medium">
            No Collections Found!
          </p>
        )}
      </div>
    </Dialog>
  );
};

export default SaveCollectionModal;
