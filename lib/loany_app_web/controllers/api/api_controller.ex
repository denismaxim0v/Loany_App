defmodule LoanyAppWeb.Api.ApiController do
  use LoanyAppWeb, :controller
  alias LoanyApp.Loans.Loan
  alias LoanyApp.Loans

  def index(conn, _params) do
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

  def delete(conn, %{"id" => id}) do
    loan = Loans.get_loan!(id)
    {:ok, _loan} = Loans.delete_loan(loan)
    conn
    |> json(%{loan: "loan deleted sucessfully"})
  end

end
