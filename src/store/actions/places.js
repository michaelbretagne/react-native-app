import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    fetch(
      "https://us-central1-share-awesome-pl-1551158588067.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({ image: image.base64 }),
      },
    )
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location,
          image: parsedRes.imageUrl,
        };
        return fetch(
          "https://share-awesome-pl-1551158588067.firebaseio.com/.places.json",
          {
            method: "POST",
            body: JSON.stringify(placeData),
          },
        )
          .catch(err => console.log(err))
          .then(res => res.json())
          .then(parsedRes => {
            console.log(parsedRes);
          });
      });
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key,
  };
};
