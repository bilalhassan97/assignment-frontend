export {};
declare global {
  interface Action {
    payload: any;
    type: string;
  }

  interface ResponseGenerator {
    data?: any;
    response?: any;
    status?: any;
  }

  interface AppState {
    loading: boolean;
  }

  interface AuthState {
    loading: boolean;
  }

  interface Restaurant {
    _id: string;
    name: string;
    schedule: [
      {
        day: string;
        startHours: number;
        startMinutes: number;
        endHours: number;
        endMinutes: number;
      }
    ];
  }
  interface Collection {
    _id: string;
    title: string;
    user: string;
  }

  interface RestaurantState {
    loading: boolean;
    restaurants: Restaurant[];
    totalRestaurants: number;
  }

  interface CollectionState {
    loading: boolean;
    collections: Collection[];
    totalCollections: number;
    collection?: Collection;
  }
}
