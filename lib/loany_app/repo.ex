defmodule LoanyApp.Repo do
  use Ecto.Repo,
    otp_app: :loany_app,
    adapter: Ecto.Adapters.Postgres
end
