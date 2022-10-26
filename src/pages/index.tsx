import type { NextPage } from "next";
import Head from "next/head";
import Todos from "../components/Todos";
import styled from "styled-components";
import AddTask from "../components/AddTask";
import { useRouter } from "next/router";
import React from "react";

const SMain = styled.main`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: sans-serif;
  margin-bottom: 1rem;
  max-width: fit-content;
  margin: 0 auto;
`;

const SHeading = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  line-height: normal;
  color: "#666666";
`;

const Home: NextPage = () => {
  const router = useRouter();

  const hasUserScope = React.useMemo(() => {
    return !!router.query.userId;
  }, [router.query]);

  return (
    <>
      <Head>
        <title>IOS Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SMain>
        <SHeading>TODO APP</SHeading>
        {hasUserScope && (
          <>
            <AddTask />
            <Todos />
          </>
        )}
        {!hasUserScope && <h2>Missing userId query parameter</h2>}
      </SMain>
    </>
  );
};

export default Home;
