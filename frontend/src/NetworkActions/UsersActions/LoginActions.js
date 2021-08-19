import fetch from "node-fetch";

export const PostRequest = async (body, history,path) => {

  //Generate the post request info
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(path, requestOptions);
    const {url} = await response;
    const relativePath = (url.substring(url.lastIndexOf('/') + 1));
   
    //In case of redicartion from our server
    if (response.redirected) {
      history.replace("/"+relativePath,{msg:'failed'});
      return {
        responseCode: '303',
        message: 'Redirecting',
      };
    } else {
      const data = await response.json();
      return {
        responseCode: data.type,
        message: data.message,
      };
    }
  } catch (e) {
    console.log("Client error " + e);
    return {
      responseCode: "500",
      message: "Request time-out",
    };
  }
};


