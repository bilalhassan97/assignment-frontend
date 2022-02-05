import { CollectionActionTypes } from "../redux/actionTypes";

export const createCollection = (payload: any) => ({
  type: CollectionActionTypes.CREATE_COLLECTION,
  payload,
});

export const getCollections = (payload: any) => ({
  type: CollectionActionTypes.GET_COLLECTIONS,
  payload,
});

export const getCollectionsSuccess = (payload: any) => ({
  type: CollectionActionTypes.GET_COLLECTIONS_SUCCESS,
  payload,
});

export const getCollectionById = (payload: any) => ({
  type: CollectionActionTypes.GET_COLLECTION_BY_ID,
  payload,
});

export const getCollectionByIdSuccess = (payload: any) => ({
  type: CollectionActionTypes.GET_COLLECTION_BY_ID_SUCCESS,
  payload,
});

export const updateCollection = (payload: any) => ({
  type: CollectionActionTypes.UPDATE_COLLECTION,
  payload,
});

export const deleteCollection = (payload: any) => ({
  type: CollectionActionTypes.DELETE_COLLECTION,
  payload,
});

export const deleteCollectionSuccess = (payload: any) => ({
  type: CollectionActionTypes.DELETE_COLLECTION_SUCCESS,
  payload,
});

export const setCollectionLoader = (payload: any) => ({
  type: CollectionActionTypes.SET_COLLECTION_LOADER,
  payload,
});
