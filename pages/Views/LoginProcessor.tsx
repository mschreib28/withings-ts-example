import React from "react";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const LoginProcessor = React.memo((props: any) => {
  const { data, error } = useSwr("/api/auth", fetcher);
  if (error) {
    return <div>Failed to load redirect url</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  } else {
    if (typeof window !== "undefined" && data.redirectUrl) {
      console.log("going to redirect url: ", data.redirectUrl);
      window.location.href = `${data.redirectUrl}`;
    } else {
      return <div>Failed to redirect to login screen.</div>;
    }
  }
});

export default LoginProcessor;
