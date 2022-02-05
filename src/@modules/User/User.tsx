import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";

import { Button, Header, Loader } from "@components";
import {
  CollectionDetailModal,
  ConfirmDeleteModal,
  ViewSavedRestaurantsModal,
} from "@components/modals";
import {
  deleteCollection,
  getCollections,
} from "@store/collection/CollectionActions";

interface UserProps {}

const limit = 10;

const User: React.FC<UserProps> = (props) => {
  const { loading }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.app
  );

  const dispatch = useDispatch();

  const [openCollectionDetail, setOpenCollectionDetail] = useState(false);
  const [openSavedRestaurants, setOpenSavedRestaurants] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [collectionId, setCollectionId] = useState<string | undefined>();

  const { collections, totalCollections }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.collection
  );

  const [currentPageNo, setCurrentPageNo] = useState(1);

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

  const editClickHandler = (id: string) => {
    setCollectionId(id);
    setOpenCollectionDetail(true);
  };

  const deleteClickHandler = (id: string) => {
    setCollectionId(id);
    setOpenConfirmDelete(true);
  };

  const viewRestaurantsHandler = (id: string) => {
    setCollectionId(id);
    setOpenSavedRestaurants(true);
  };

  return (
    <div>
      <Header />
      <Loader loading={loading} />
      <div className="h-80 flex items-center justify-center bg-[url(assets/images/userCollectionBg.jpg)] bg-cover">
        <p className="text-white text-3xl font-bold">Your Collections</p>
      </div>
      <div className="flex w-full items-center justify-center py-10">
        <Button color="secondary" onClick={() => setOpenCollectionDetail(true)}>
          + New Collection
        </Button>
      </div>
      {collections?.length > 0 ? (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 pb-10 px-4 lg:px-[10vw]">
          {collections.map(({ _id, title }: Collection, index: number) => (
            <div
              className="flex flex-col shadow-md rounded-md"
              key={_id}
              ref={collections.length === index + 1 ? lastElementRef : null}
            >
              <div className="bg-[url(assets/images/collectionBg.jpg)] bg-cover rounded-t-md h-32 flex items-center justify-center">
                <p className="text-white font-bold text-xl capitalize">
                  {title}
                </p>
              </div>
              <div className="flex px-3 items-center justify-between space-x-2 py-4">
                <Button onClick={() => viewRestaurantsHandler(_id)}>
                  View Restaurants
                </Button>
                <div className="flex space-x-2 items-center">
                  <Tooltip title="Edit Collection Name">
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() => editClickHandler(_id)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete Collection">
                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={() => deleteClickHandler(_id)}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-3xl font-bold py-10 lg:py-20">
          No Collections Found!
        </p>
      )}
      <CollectionDetailModal
        open={openCollectionDetail}
        onClose={() => {
          setOpenCollectionDetail(false);
          setCollectionId(undefined);
        }}
        onSave={() => {
          setOpenCollectionDetail(false);
          setCollectionId(undefined);
          setCurrentPageNo(1);
        }}
        id={collectionId}
      />
      <ConfirmDeleteModal
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmDelete(false);
          setCollectionId(undefined);
        }}
        onCancel={() => {
          setOpenConfirmDelete(false);
          setCollectionId(undefined);
        }}
        onConfirm={() => {
          setOpenConfirmDelete(false);
          const id = collectionId;
          dispatch(deleteCollection({ id }));
          setCollectionId(undefined);
        }}
      />
      <ViewSavedRestaurantsModal
        open={openSavedRestaurants}
        onClose={() => {
          setOpenSavedRestaurants(false);
          setCollectionId(undefined);
        }}
        collectionId={collectionId}
      />
    </div>
  );
};

export default User;
