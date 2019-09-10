defmodule LoanyAppWeb.Router do
  use LoanyAppWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LoanyAppWeb do
    pipe_through :browser

    get "/", PageController, :index
    resources "/loans", LoanController
  end

  # Other scopes may use custom stacks.
  # scope "/api", LoanyAppWeb do
  #   pipe_through :api
  # end
end
