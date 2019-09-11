defmodule LoanyAppWeb.Api.ApiController do
  use LoanyAppWeb, :controller
  alias LoanyApp.Repo
  alias LoanyApp.Loans.Loan
  alias LoanyApp.Loans

  def index(conn, _params) do
    #loans = Repo.all(Loan)
    loans = Loans.list_loans()
    json(conn, %{loans: loans})
  end

  def show(conn, %{"id" => id}) do
      loan = Loans.get_loan!(id)
      json(conn, %{loan: loan})
  end

  def create(conn, %{"loan" => loan_params}) do
    changeset = Loan.generate_changeset(loan_params)
    case Loans.create_loan(changeset) do
      {:ok, loan} ->
        conn
        |> json(%{loan: loan.status, id: loan.id})

    end
  end

end
