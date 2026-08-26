import React, { ComponentProps } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { MockedProvider } from "@apollo/client/testing/react";

type MockedProviderProps = ComponentProps<typeof MockedProvider>;

type RenderApolloOptions = {
  mocks?: MockedProviderProps["mocks"];
  defaultOptions?: MockedProviderProps["defaultOptions"];
  cache?: MockedProviderProps["cache"];
  /** Ignored under Apollo Client 4 MockedProvider */
  addTypename?: boolean;
  /** Ignored under Apollo Client 4 MockedProvider */
  resolvers?: unknown;
} & Omit<RenderOptions, "wrapper">;

const renderApollo = (
  node: React.ReactElement,
  options: RenderApolloOptions = {},
): RenderResult => {
  const {
    mocks,
    defaultOptions,
    cache,
    addTypename: _addTypename,
    resolvers: _resolvers,
    ...renderOptions
  } = options;

  return render(
    <MockedProvider mocks={mocks} defaultOptions={defaultOptions} cache={cache}>
      {node}
    </MockedProvider>,
    renderOptions,
  );
};

type Renderer = (
  node: React.ReactElement,
  options?: RenderApolloOptions,
) => RenderResult;

export const renderWithRouterGenerator =
  (renderer: Renderer): Renderer =>
  (node, options) =>
    renderer(<BrowserRouter>{node}</BrowserRouter>, options);

export const renderWithRouter = renderWithRouterGenerator(render);

export const renderApolloWithRouter = renderWithRouterGenerator(renderApollo);

export * from "@testing-library/react";
export { renderApollo };
