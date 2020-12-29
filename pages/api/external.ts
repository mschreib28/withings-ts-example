async function external(url: string, config?: object): Promise<withings.DataResult> {
  //config is optional params, like method, body: JSON.stringify({post-data}), headers, etc.
  const res = await fetch(url, config);

  try {
    const data = await res.json();
  } catch (e) {
    //console.log("couldn't parse as JSON: ", e);
    return res;
  }
}

export default external;
