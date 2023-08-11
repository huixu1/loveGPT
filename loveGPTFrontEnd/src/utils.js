const domain = "http://localhost:5000";

//feature 1
//render previous chat history after login at left side bar -- simulation done
export const getHistoryByUser = async () => {
  //get user id
  const authToken = localStorage.getItem("authToken");
  //get all chat history
  const get_history = `${domain}/rooms/get_history/`;

  const response = await fetch(get_history, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (response.status !== 200) {
    throw Error("Fail to get history");
  }
  return await response.json();
};

//feature 2
//send user input to backend, get response, and render on content -- simulation done
//if content is not empty, rename title 1 on side bar with the first few words in chat window
export const chatGPTresponse = async (userInput) => {
  //get user id
  const authToken = localStorage.getItem("authToken");
  //get robot info???
  //

  //get all chat history
  const get_chatGPTresponse = `${domain}/rooms/ask/`;

  const response = await fetch(get_chatGPTresponse, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (response.status !== 200) {
    throw Error("Fail to get response");
  }
  return await response.json();
};

//feature 3
//click side bar to show content
