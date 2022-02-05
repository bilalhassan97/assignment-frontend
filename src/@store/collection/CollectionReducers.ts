import { CollectionActionTypes } from "../redux/actionTypes";

const INITIAL_STATE: CollectionState = {
  loading: false,
  collections: [],
  totalCollections: 0,
  // collection:{},
};

const CollectionReducer = (
  state: CollectionState = INITIAL_STATE,
  action: Action
): CollectionState => {
  switch (action.type) {
    case CollectionActionTypes.GET_COLLECTIONS:
      if (action.payload.page === 1) {
        return {
          ...state,
          collections: [],
          totalCollections: 0,
          loading: true,
        };
      }
      return { ...state, loading: true };

    case CollectionActionTypes.GET_COLLECTIONS_SUCCESS:
      if (action.payload.page === 1) {
        return {
          ...state,
          collections: action.payload.collections,
          totalCollections: action.payload.totalCollections,
        };
      }
      return {
        ...state,
        collections: [...state.collections, ...action.payload.collections],
        totalCollections: action.payload.totalCollections,
      };
    case CollectionActionTypes.GET_COLLECTION_BY_ID_SUCCESS:
      const { collection } = action.payload;
      if (collection && !collection.collaborator) {
        collection.collaborator = "";
      }
      return {
        ...state,
        collection,
      };

    case CollectionActionTypes.DELETE_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: state.collections.filter(
          (item) => action.payload.id !== item._id
        ),
      };

    case CollectionActionTypes.SET_COLLECTION_LOADER:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default CollectionReducer;
