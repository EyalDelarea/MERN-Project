import fetch from "node-fetch";

export const sendRegisterRequest = async (body, history) => {

  //Generate the post request info
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch("/users/register", requestOptions);
    //In case of redicartion from our server
    if (response.redirected) {
      history.push("/");
      return;
    } else {
      const data = await response.json();
      return {
        responseCode: data.type,
        message: data.message,
      };
    }
  } catch (e) {
    console.log("Client error,request is broken " + e);
    return {
      responseCode: "400",
      message: "There is something wrong with the request",
    };
  }
};
