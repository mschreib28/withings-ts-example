export async function getData(url: string, config?: object): Promise<any> {
  //config is optional params, like method, body: JSON.stringify({post-data}), headers, etc.
  const res = await fetch(url, config);

  try {
    const data = await res.json();
    return data;
  } catch (e) {
    //console.log("couldn't parse as JSON: ", e);
    return res;
  }
}
