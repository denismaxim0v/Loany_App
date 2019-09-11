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

  

  scope "/api", LoanyAppWeb.Api, as: :api  do
    pipe_through :api

    resources "/loans", ApiController
  end
  scope "/", LoanyAppWeb do
    pipe_through :browser

    
    #resources "/loans", LoanController
    get "/*path", PageController, :index
  end

  

  # Other scopes may use custom stacks.
  # scope "/api", LoanyAppWeb do
  #   pipe_through :api
  # end
end
