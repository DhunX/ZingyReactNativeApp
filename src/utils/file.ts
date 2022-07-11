export const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    return blob;
  };