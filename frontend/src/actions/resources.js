import axios from "axios";
import { setActiveRow } from "./index.js";

export const setResourceUrl = url => {
  return {
    type: "SET_RESOURCE_URL",
    url
  };
};

export const setResource = resource => {
  return {
    type: "SET_RESOURCE",
    resource
  };
};

export const setResourceRow = (name, row) => {
  return {
    type: "SET_RESOURCE_ROW",
    name,
    row
  };
};

export const setActiveResourceName = name => {
  return {
    type: "SET_ACTIVE_RESOURCE_NAME",
    activeResourceName: name
  };
};

export const fetchResourceData = name => {
  return (dispatch, getState) => {
    let baseUrl = getState().apiUrl;
    let url = baseUrl + "/" + name + "?_format=json";

    axios
      .get(url)
      .then(result => {
        console.log('result', result);
        dispatch({
          type: "SET_RESOURCE_DATA",
          name,
          data: result.data
        });
      });
  };
};

export const fetchResourceFields = name => {
  return (dispatch, getState) => {
    let baseUrl = getState().apiUrl;
    let url = baseUrl + "/" + name + "/fields";
    axios
      .get(url, { headers: { "x-access-token": localStorage.token } })
      .then(result => {
        dispatch({
          type: "SET_RESOURCE_FIELDS",
          name,
          fields: result.data
        });
      });
  };
};

export const deleteResourceRow = row => {
  return (dispatch, getState) => {
    let baseUrl = getState().apiUrl;
    let name = getState().activeResourceName;
    let url = baseUrl + "/" + name + "/" + row.id;
    axios
      .delete(url, { headers: { "x-access-token": localStorage.token } })
      .then(result => {
        dispatch({
          type: "DELETE_RESOURCE_ROW",
          name,
          row
        });
      });
  };
};

export const saveResourceData = data => {
  return (dispatch, getState) => {
    let urlParam = data.id ? "/" + data.id : "";
    let resourceName = getState().activeResourceName;
    //console.log(data);
    //data.tags = [3,5,7];
    axios({
      method: data.id ? "put" : "post",
      url: getState().apiUrl + "/" + resourceName + urlParam,
      data
    }).then(result => {
      dispatch(setActiveRow(null));
      /*const updatedRow =
        result.data instanceof Array ? result.data[0] : result.data;*/
      //dispatch(setResourceRow(resourceName, updatedRow));
      dispatch(fetchResourceData(resourceName));
    });
  };
};
